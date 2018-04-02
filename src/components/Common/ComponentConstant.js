// export const CATEGORY_TYPES = {
//   1: "通用",
//   2: "电力",
//   3: "FAS",
//   4: "BAS",
// };
export const CATEGORY_TYPES = {
  common: "通用",
  scada: "电力",
  fui: "表单",
  fas: "FAS",
  bas: "BAS",
};
export const GROUP_TYPES = {
  1: "基本形状",
  2: "常用控件",
  3: "配电网络",
  4: "工业控制",
  5: "容器控件",
  6: "导航控件",
  7: "形状控件",
  8: "图表控件",
};
export const GENRE_TYPES = {
  1: "系统",
  2: "用户",
};
export const DATATEMP_TYPES = {
  0: "通用数据源",
  1: "Modbus_Tcp数据源",
  2: "虚拟数据源",
  3: "健康数据源",
  4: "示波器数据源",
  6: "Excel数据源",
};

export const DATAPOINTTEMP_TYPES1 = {
  1: "读模拟量输入",
  2: "读数字量输入",
  3: "读数字量输出",
  4: "写数字量输出",
  5: "读模拟量输出",
  6: "写模拟量输出",
  0: "通用",
};
export const DATAPOINTTEMP_TYPES2 = {
  0: "通用",
  12: "虚拟",
};
export const DATAPOINTTEMP_TYPES0 = {
  0: "通用",
};
export const DATAPOINTTEMP_TYPES3 = {
  0: "通用",
  7: "心跳",
  8: "占用内存数",
  9: "CPU占有率",
  10: "重启次数",
  15: "设备主备状态",
};
export const DATAPOINTTEMP_TYPES4 = {
  0: "通用",
  11: "储存示波器数据",
};
export const DATAPOINTTEMP_TYPES6 = {
  0: "通用",
  13: "Excel类型数据点",
};
export const UNIT_TYPES = {
  1: "V/电压",
  2: "℃/温度",
  3: "kg/千克",
  4: "%/百分百",
  5: "B/字节",
};
export const SYSTEM_TYPES = {
  1: "系统",
  2: "个人",
};
export const DATA_TYPES = {
  1: "开关类型(0,1)",
  2: "数值型",
  3: "字符串",
  4: "json",
};
export const LEVEL_TYPES = {
  1: "严重错误",
  2: "错误",
  3: "警告",
  4: "信息",
};
export const ALERT_TYPES1 = {
  1: "开关量报警",
  2: "开关量跳变报警",
  3: "开关量正跳变报警",
  4: "开关量负跳变报警",
};
export const ALERT_TYPES2 = {
  5: "下下限报警",
  6: "下限报警",
  7: "上限报警",
  8: "上上限报警",
  9: "下偏差报警",
  10: "上偏差报警",
};
// export const GIS_CATEGORY_TYPES = {
//   1: "电力监控",
//   2: "视频监控",
//   3: "运维管理",
// };

export const GIS_CATEGORY_TYPES = {
  common: "通用",
  scada: "电力",
  fui: "表单",
  video: "视频监控",
};
export const CALENDER_CATEGORY_TYPES = {
  fix: "维修单",
  repair: "报修单",
  attendance: "考勤表",
};

export const RESOURCE_TYPE = {
  common: "通用",
  scada: "电力",
  fui: "表单",
};

export const COMPONENT_GROUP = {
  base: "基本形状",
  common: "常用控件",
  container: "容器控件",
};

export const WORKFLOW_GROUP = {
  genre_1: "事假",
  genre_2: "年假",
  genre_3: "病假",
  genre_4: "婚假",
};
