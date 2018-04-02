import React, { Component, PropTypes } from "react";
import { OPERATION_ADD, OPERATION_LEVEL_SUCCESS, OPERATION_DELETE } from "components/Common/OperationConstant";
import { CalculateObject } from "components/Common/CommonUtil";
import __ from "lodash";
import DesignerPage from "./DesignerPage";
import CodePage from "./CodePage";
import WorkbenchToolbar from "./WorkbenchToolbar";

/**
 * Workbench类，代表工作台
 */
export default class Workbench extends Component {
  // 全局上下文 注册通知服务
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  // 定义校验 prop
  static propTypes = {
    updatePagesObjects: PropTypes.func.isRequired,
    updateCurrentPageObjects: PropTypes.func.isRequired,
    setupProjectCurrentObject: PropTypes.func.isRequired,
    getPages: PropTypes.func.isRequired,
    getDataSources: PropTypes.func.isRequired,
    setupWidgetCurrentObject: PropTypes.func.isRequired,
    searchWidget: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    searchFinish: PropTypes.func.isRequired,
    pageOperationFinish: PropTypes.func.isRequired,
    widgetOperationFinish: PropTypes.func.isRequired,
    setupWidgetCurrentObjectFinish: PropTypes.func.isRequired,
    resetFinish: PropTypes.func.isRequired,
    addPage: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    searchGisByPageId: PropTypes.func.isRequired,
    delGisInfo: PropTypes.func.isRequired,
    addWidget: PropTypes.func.isRequired,
    updateWidget: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    workbench: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  /**
   * 构造函数
   * 用于定义state以及时间的bind
   */
  constructor(props) {
    super(props);
    // 用于切换视图名称 默认是设计视图
    this.state = {
      viewName: "design",
    };
    // 处理各种事件的绑定
    this.handleAddPage = this.handleAddPage.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleDeletePage = this.handleDeletePage.bind(this);
    this.handleSaveWidget = this.handleSaveWidget.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdateWidget = this.handleUpdateWidget.bind(this);
    this.updateCurrentPageObjects = this.props.updateCurrentPageObjects.bind(this);
  }

  /**
   * React 生命周期 在页面被宣言之前执行
   */
  componentWillMount() {
    // 通过url获取id和from获取工程编号以及项目从哪里来
    if (this.props.location.query.id && this.props.location.query.from) {
      // 如果从工程点击进来
      // 1、把当前工程信息存储到Redux中的currentPage 以及 type
      // 2、获取工程所有界面
      // 3、获取工程所有数据源
      // 如果从组件点击进来
      // 1、把当前组件信息存储到Redux中的currentPage 以及 type
      if (this.props.location.query.from === "project") {
        this.props.setupProjectCurrentObject(parseInt(this.props.location.query.id, 10));
        this.props.getPages(parseInt(this.props.location.query.id, 10));
        this.props.getDataSources(parseInt(this.props.location.query.id, 10));
      } else {
        this.props.setupWidgetCurrentObject(parseInt(this.props.location.query.id, 10));
      }
    // 当切换到其他界面在切换回来时，首先判断当前对象是否为空
    } else if (this.props.workbench.currentObject) {
      // 如果type为工程
      // 1、获取工程所有界面
      // 2、获取工程所有数据源
      if (this.props.workbench.type === "project") {
        this.props.getPages(this.props.workbench.currentObject.id);
        this.props.getDataSources(this.props.workbench.currentObject.id);
      } else {
        this.props.setupWidgetCurrentObject(this.props.workbench.currentObject.id);
      }
    }
    // 获取所有组件列表信息
    this.props.searchWidget();
  }

  /**
   * [componentWillReceiveProps 处理更新状态]
   */
  componentWillReceiveProps(nextProps) {
    // 如果type是工程
    if (nextProps.workbench.type === "project") {
      // 如果查询完界面 查询完组件 查询完数据源
      if (nextProps.workbench.searchPageState === true && nextProps.workbench.searchWidgetState === true && nextProps.workbench.searchDataSourceState === true) {
        // 如果界面集合没有任何界面则进行创建默认主界面并且设置当前界面为主界面
        // 如果界面集合存在任何界面则配置界面集合第一个为主界面
        if (nextProps.workbench.pages.length === 0) {
          const page = {
            // id: "",
            project_id: nextProps.workbench.currentObject.id,
            name: "主界面",
            data: {
              id: "001",
              objects: [],
              styles: {
                height: 500,
                viewBox: "0 0 600 600",
                width: 500,
                x: 0,
                y: 0,
              },
              tag: "Cell",
            },
          };
          this.handleAddPage(page);
        } else {
          this.props.setCurrentPage(nextProps.workbench.pages[0]);
        }
        // 更新redux中的查询状态
        this.props.searchFinish();
      }
      // 如果界面的任何操作（新增 删除）状态为true
      // 则进行消息提示并且更新redux状态
      if (nextProps.workbench.pageOperationState === true) {
        if (nextProps.workbench.operation === OPERATION_ADD) {
          // Object.assign(nextProps.workbench.currentPage, { id: nextProps.workbench.operationResult.id });
          nextProps.workbench.currentPage.id = nextProps.workbench.operationResult;
        } else if (nextProps.workbench.operation === OPERATION_DELETE && nextProps.gis.searchGisByPage === true && nextProps.gis.pageId) {
          if (nextProps.gis.pageId.length) {
            this.props.delGisInfo(nextProps.gis.pageId[0].id);
          }
          this.props.setCurrentPage(nextProps.workbench.pages[0]);
        }
        this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.workbench.operation, "界面");
        this.props.pageOperationFinish();
      }
      // 如果组件的任何操作（新增 删除）状态为true
      // 则进行重新产寻组件列表并且消息提示并且更新redux状态
      if (nextProps.workbench.widgetOperationState === true) {
        this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.workbench.operation, "组件");
        this.props.searchWidget();
        this.props.widgetOperationFinish();
      }
    // 如果是type是组件类型
    } else if (nextProps.workbench.type === "widget") {
      // 设置组件为当前对象
      if (nextProps.workbench.setupWidgetCurrentObjectState === true) {
        this.props.setCurrentPage(nextProps.workbench.currentObject);
        this.props.setupWidgetCurrentObjectFinish();
      }
      // 设置组件操作状态
      if (nextProps.workbench.widgetOperationState === true) {
        this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.workbench.operation, "组件");
        this.props.widgetOperationFinish();
      }
    }
  }

  /**
   * [componentWillUnmount 生命周期结束重置所有Redux状态]
   */
  componentWillUnmount() {
    this.props.resetFinish();
  }

  /**
   * [handleAddPage 处理添加界面]
   * @param  {[object]} page [界面对象]
   */
  handleAddPage(page) {
    // 界面集合添加新界面
    this.props.updatePagesObjects(page);
    // 设置新界面为当前界面
    this.props.setCurrentPage(page);
    // 添加界面到数据库中
    this.props.addPage(page);
  }

  /**
   * [handleChangeView 处理切换设计或代码]
   * @param  {[string]} name [切换界面的名称 代码或者设计]
   */
  handleChangeView(name) {
    this.setState({
      viewName: name,
    });
  }

  /**
   * [handleChangePage 处理切换界面]
   * @param  {[type]} currentPageName [当前界面名称]
   */
  handleChangePage(currentPageName) {
    // 遍历所有界面查找到当前界面并且切换
    if (this.props.workbench.pages.length !== 0) {
      for (let i = 0; i < this.props.workbench.pages.length; i++) {
        if (currentPageName === this.props.workbench.pages[i].name) {
          this.props.setCurrentPage(this.props.workbench.pages[i]);
        }
      }
    }
  }

  /**
   * [handleDeletePage 处理删除界面]
   * @param  {[type]} pageId [界面编号]
   */
  handleDeletePage(pageId) {
    this.props.searchGisByPageId(pageId);
    // 删除界面结合中的对象界面id的界面对象
    const spliceIndex = this.props.workbench.pages.findIndex(page => page.id === pageId);
    this.props.deletePagesObjects(spliceIndex);
    // 调用数据库中的删除
    this.props.deletePage(pageId);

  }

  /**
   * [handleSaveWidget 处理保存组件]
   * @param  {[type]} widgetBasicInfo [组件基本信息]
   * @param  {[type]} widgetWidth     [组件宽度]
   * @param  {[type]} widgetHeight    [组件高度]
   */
  handleSaveWidget(widgetBasicInfo, widgetWidth, widgetHeight) {
    // 计算组件的ViewBox
    const calcResult = CalculateObject(this.props.workbench.currentPage.data.objects);
    const objects = __.cloneDeep(this.props.workbench.currentPage.data.objects);
    const xyObjects = objects.map((object) => {
      object.styles.x = object.styles.x - calcResult.x;
      object.styles.y = object.styles.y - calcResult.y;
      // Object.assign(object.styles, { x: object.styles.x - calcResult.x, y: object.styles.y - calcResult.y });
      return object;
    });

    const widget = {
      name: widgetBasicInfo.name,
      category: widgetBasicInfo.category,
      group: widgetBasicInfo.group,
      data: {
        objects: xyObjects,
        styles: {
          width: widgetWidth,
          height: widgetHeight,
          viewBox: `0 0 ${calcResult.cellWidth} ${calcResult.cellHeight}`,
          x: 0,
          y: 0,
        },
        tag: "Cell",
      },
    };
    // 保存组件
    this.props.addWidget(widget);
  }

  /**
   * [handleUpdateWidget 处理更新组件]
   */
  handleUpdateWidget() {
    const currentPage = this.props.workbench.currentPage;
    const widget = {
      data: currentPage.data,
    };
    this.props.updateWidget(currentPage.id, widget);
  }

  /**
   * [handleSave 处理保存]
   * @param  {[number]} saveHeight [保存的高度]
   * @param  {[number]} saveWidth  [保存的宽度]
   */
  handleSave(saveHeight, saveWidth) {
    // 更改所有界面的保存宽度以及高度
    // if(this.props.workbench.pages.length){}
    this.props.workbench.pages.map((item) => {
      // 计算每个界面所有组件的viewBox
      const calcResult = CalculateObject(item.data.objects);
      item.data.styles.height = saveHeight;
      item.data.styles.width = saveWidth;
      item.data.styles.viewBox = calcResult.viewBox;
      // Object.assign(item.data.styles, { height: saveHeight, width: saveWidth, viewBox: calcResult.viewBox });
      this.props.save(item);
      return item;
    });
  // 执行保存操作
  // this.props.save(this.props.workbench.pages);
  }

  /**
   * [handleBlur 处理失去焦点]
   * @param  {[object]} json [新json赋给当前界面的数据的对象中]
   */
  handleBlur = (newJson) => {
    this.props.updateCurrentPageObjects(newJson);
    this.props.setCurrentPage(this.props.workbench.currentPage);
  };

  /**
   * 渲染
   */
  render() {
    const { currentObject, pages, currentPage, type, listWidget, listDataSource } = this.props.workbench;
    return (
      <div>
        {currentObject &&
         <WorkbenchToolbar
           id={currentObject.id}
           pages={pages}
           currentPage={currentPage}
           onAddPage={this.handleAddPage}
           onChangeView={this.handleChangeView}
           onChangePage={this.handleChangePage}
           onDelete={this.handleDeletePage}
           onSaveWidget={this.handleSaveWidget}
           onSave={this.handleSave}
           onUpdateWidget={this.handleUpdateWidget}
           from={type}
         />}
        <div style={{ clear: "both", height: 5 }} />
        {currentPage &&
         currentPage.data &&
         <div style={{ clear: "both" }}>
           {this.state.viewName === "design" &&
            <DesignerPage viewBox={currentPage.data.styles.viewBox} onHandleUpdateObjects={this.updateCurrentPageObjects} data={currentPage.data.objects} widgets={listWidget} currentPageId={currentPage.id} />}
           {this.state.viewName === "code" && <CodePage viewBox={currentPage.data.styles.viewBox} data={currentPage.data.objects} dataSource={listDataSource} onBlur={this.handleBlur} />}
         </div>}
      </div>
      );
  }
}
