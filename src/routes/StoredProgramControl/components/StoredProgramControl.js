import React, { Component, PropTypes } from "react";
import CodeView from "./CodeView";
import SPCToolbar from "./SPCToolbar";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";

/**
 * StoredProgramControl：运行时类
 */

let b = 0;

export default class StoredProgramControl extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  static propTypes = {
    start: PropTypes.func.isRequired,
    end: PropTypes.func.isRequired,
    changeSendData: PropTypes.func.isRequired,
    getDataSources: PropTypes.func.isRequired, // 加载数据源和点的综合信息
    getPages: PropTypes.func.isRequired, // 获取页面方法
    getPagesFinish: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired, // 地址对象
    storedprogramcontrol: PropTypes.object.isRequired, // storedprogramcontrol对象
    switchDevice: PropTypes.func.isRequired,
    test: PropTypes.object.isRequired,
    unregisterAlert: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    updateCurrentPageJson: PropTypes.func.isRequired,
    stopProgrammed: PropTypes.func.isRequired,
    changeData: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataSource: null,
      alerts: null,
      alertSource: null,
      controlJson: {},
      pageId: null,
      disable: false,
    };
  }

  componentWillMount() {
    this.props.getPages(parseInt(this.props.location.query.id, 10));
    this.props.start(parseInt(this.props.location.query.id, 10));
    this.props.getDataSources(parseInt(this.props.location.query.id, 10));
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  componentWillReceiveProps(nextProps) {
    const { test, storedprogramcontrol } = nextProps;
    if (storedprogramcontrol.searchPageState === true) {
      this.setState({
        data: storedprogramcontrol.pages,
      });
      this.props.getPagesFinish();
    }
    if (storedprogramcontrol.currentPageState === true) {
      this.handleSelect(storedprogramcontrol.pages, 1);
    }

    // if (storedprogramcontrol.refresh === true) {
    //   this.props.getPages(parseInt(this.props.location.query.id, 10));
    // }
    if (storedprogramcontrol.alertInfo) {
      this.registerNotifiaction(storedprogramcontrol.alert);
      this.props.unregisterAlert();
    }

    if (test.dsMap.length > 0) {
      this.setState({
        dataSource: test.data,
      });
    }
    if (test.alertData) {
      this.setState({
        alertSource: test.alertData,
      });
    }
    if (test.alertMesage) {
      this.setState({
        alerts: test.alertMesage,
      });
    }
    if (storedprogramcontrol.datachange && storedprogramcontrol.datachanged === true) {
      this.sendNextProgrammedMsg();
    }
  }

  /**
  * 卸载的时候停止刷新
  */

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
    window.removeEventListener("unload", this.handleDestroy);
  }
  /**
   * 作为beforeunload事件的回调函数
   */
  onUnload = (e) => {
    // the method that will be used for both add and remove event
    e.returnValue = "离开该网站";
  };

  setDevice = (key) => {
    this.props.switchDevice(key);
  };

  setData = (key, value) => {
    this.props.changeData(key, value);
  };

  setAlert = (key, value) => {
    const { alertSource } = this.state;
    if (key in alertSource) {
      alertSource[key] = value;
      this.setState({
        alertSource,
      });
    }
  };

  sendNextProgrammedMsg = () => {
    const content = this.props.storedprogramcontrol.currentPage.process_control.programmed_content;
    if (b < content.length) {
      if (this.props.test.data[content[b - 1].expected_node_id] === content[b - 1].value) {
        this.props.changeSendData(content[b].data_node_id, content[b].value);
        b++;
        this.setState({
          disable: true,
        });
      } else {
        this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, `第${b}个操作错误`, "程控");
        this.endProgrammed();
      }
    } else if (b === content.length && this.props.test.data[content[b - 1].expected_node_id] === content[b - 1].value) {
      this.endProgrammed();
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, "执行", "程控");
    } else {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, `第${b}个操作错误`, "程控");
      this.endProgrammed();
    }
  };

  endProgrammed = () => {
    this.props.stopProgrammed();
    b = 0;
    this.setState({
      disable: false,
    });
  };

  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    this.props.end();
  };

  /**
  * 修改组件json时，实现页面刷新，进行回调
  * @param  {[object]} componentsJson [页面的组件json]
  */
  handleClick = (controlJson) => {
    this.props.updateCurrentPageJson(controlJson);
    this.props.setCurrentPage(this.props.storedprogramcontrol.currentPage);
  };

  handleSelect = (pages, key) => {
    this.props.setCurrentPage(pages[parseInt(key, 10) - 1]);
  };

  saveJson = (pageId, controlJson) => {
    this.props.save(pageId, controlJson);
  };

  send = () => {
    const content = this.props.storedprogramcontrol.currentPage.process_control.programmed_content;
    if (content.length) {
      this.props.changeSendData(content[0].data_node_id, content[0].value);
    }
    b++;
    this.setState({
      disable: true,
    });
  };

  render() {
    const { currentPage } = this.props.storedprogramcontrol;
    return (
      <div>
        <SPCToolbar
          dataSource={this.state.dataSource}
          changeData={this.props.changeData}
          pages={this.state.data}
          handleSelect={this.handleSelect}
          handleSave={this.saveJson}
          currentPage={currentPage}
          send={this.send}
          abled={this.state.disable}
        />
        <CodeView
          dataSourceMap={this.props.test.dsMap}
          dataSource={this.state.dataSource}
          alertSource={this.state.alertSource}
          currentPage={currentPage}
          onhandleClick={this.handleClick}
          controlJson={this.state.controlJson}
          setData={this.setData}
        />
      </div>
    );
  }
}
