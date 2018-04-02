import __ from "lodash";
import React from "react";

/**
 * 旋转坐标转化
 * @param  {string} options.rotate  旋转角度
 * @param  {int} options.x          x坐标
 * @param  {int} options.y          y坐标
 * @param  {int} options.width      宽度
 * @param  {int} options.height     高度
 * @return {string}                 旋转坐标的函数
 */
const getTransformMatrix = ({ rotate, x, y, width, height }) => {
  if (rotate) {
    const centerX = width / 2 + x;
    const centerY = height / 2 + y;
    return `rotate(${rotate} ${centerX} ${centerY})`;
  }
};

/**
 * 从对象中获取状态的样式信息
 * @param  {object} conditionObject 对象里面包括condition字段
 * @param  {array} conditions       数组对象，里面包含各个condition的配置信息
 * @return {array}                  返回condition名称所对应的属性信息的数组
 */
const getCondition = (conditionObject, conditions) => {
  if ("condition" in conditionObject) {
    const { name, ...styles } = __.find(conditions, {
      name: conditionObject.condition,
    });
    return styles;
  }
  return [];
};

/**
 * 获取值，转成整形
 * @param  {string} value 值
 * @return {int}
 */
const getValue = (value) => {
  return value ? parseInt(value, 10) : 0;
};

/**
 * 判断传入字符是否是一个可执行的函数，
 * @param {object} str 传入一个字段
 */
export function IsFunc(str) {
  if (__.isFunction(str) || __.isNumber(str) || __.isPlainObject(str) || __.isArray(str)) {
    return false;
  }
  if (str) {
    return str.includes("(") || str.includes(")") || str.includes("?");
  }
  return false;
}

export function IsObject(str) {
  return __.isPlainObject(str);
}

/**
 * 绑定表达式
 * @param  {string} expr    表达式
 * @param  {object} context 上下文
 * @return {func}           绑定表达式后返回func
 */
const bindExpr = (expr, context) => {
  if (!IsFunc(expr)) {
    return expr;
  }
  return (expr => eval(expr)).bind(context, expr);
};

/**
 * 绑定事件对象
 * @param {object} options.events 事件对象
 * @param {object} context        上下文
 */
export function GetEvents({ events }, context) {
  if (events) {
    return __.mapValues(events, expr => bindExpr(expr, context));
  }
}

/**
 * 获取处理绑定
 * @param {object} context 上下文
 */
export function GetBinds(context) {
  const { binds } = context.props;
  if (binds) {
    return __.mapValues(binds, attr => {
      // 绑定中有conditions这种是数组的对象，需要单独进行处理
      if (__.isArray(attr)) {
        return attr.map(item => bindExpr(item, context));
      } else if (IsObject(attr)) {
        return __.mapValues(attr, item => bindExpr(item, context));
      } else {
        return bindExpr(attr, context);
      }
    });
  }
}

/**
 * 计算对象的边界，viewbox
 * @param {array} objects 对象数组
 */
export function CalculateObject(objects) {
  const data = {};
  // 获取对象最大最小XY值，最大值需要加宽高
  const maxX = __.maxBy(objects, object => object.styles.x + getValue(object.styles.width));
  const maxY = __.maxBy(objects, object => object.styles.y + getValue(object.styles.height));
  const minX = __.minBy(objects, object => object.styles.x);
  const minY = __.minBy(objects, object => object.styles.y);
  data.cellHeight = parseInt(maxY.styles.y, 10) - parseInt(minY.styles.y, 10) + getValue(maxY.styles.height);
  data.cellWidth = parseInt(maxX.styles.x, 10) - parseInt(minX.styles.x, 10) + getValue(maxX.styles.width);
  data.viewBox = minX.styles.x + " " + minY.styles.y + " " + data.cellWidth + " " + data.cellHeight;
  data.x = parseInt(minX.styles.x, 10);
  data.y = parseInt(minY.styles.y, 10);
  return data;
}

/**
 * 获取对象属性，并进行属性合并
 * @param {object} options.styles     默认样式
 * @param {array} options.conditions  数组
 * @param {object} options.binds      绑定对象
 * @param {object} bounds             计算过的绑定对象
 */
export function GetObjectAttributes({ styles, conditions, binds }, bounds) {
  const conditionStyle = getCondition(styles, conditions);
  let allBindStyles = {};
  // 如果有计算过的绑定对象传值，则来自运行时，否则则来自设计时
  const attrBinds = bounds === undefined ? binds : bounds;

  if (attrBinds && "condition" in attrBinds) {
    attrBinds.condition.map(condition => {
      if (condition && !IsFunc(condition)) {
        const { name, ...conditionStyles } = __.find(conditions, {
          name: condition,
        });
        allBindStyles = Object.assign({}, allBindStyles, conditionStyles);
      }
    });
  }

  const otherStyles = __.pickBy(attrBinds, attr => !IsFunc(attr));

  return {
    transform: getTransformMatrix(styles),
    ...styles,
    ...conditionStyle,
    ...allBindStyles,
    ...otherStyles,
  };
}

/**
 * 获取菜单信息
 * @param {object}  context    上下文
 * @param {Boolean} isDesigner 是否为设计时
 */
export function GetMenus(context, isDesigner = false) {
  const { menus, conditions } = context.props;
  if (menus) {
    const menuStyles = menus.map(menu => {
      return {
        styles: getCondition(menu, conditions),
        events: isDesigner ? "" : GetEvents(menu, context),
      };
    });
    return menuStyles;
  }
}

/**
 * 根据类型，动态地创建option选项
 * @param  {object} types [类型]
 * @return {array} option数组
 */
export function createOpt(types) {
  // 获得对象的key值
  const typesKeys = types ? Object.keys(types) : null;
  if (typesKeys && typesKeys.length > 0) {
    return typesKeys.map((element, index) => (<option value={element} key={index + 1}>
                                                {types[element]}
                                              </option>));
  }
}
