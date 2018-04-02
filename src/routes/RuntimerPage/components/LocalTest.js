import React, { Component, PropTypes } from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { Button } from "react-bootstrap";
import DataSourcePanel from "../../../components/CellsArt/DataSourcePanel";
import Runtimer from "../../../components/CellsArt/Runtimer";
import JsonPanel from "../../../components/CellsArt/JsonPanel";
import "../../../components/styles/CodePage.scss";
import "./RuntimerPage.scss";
/**
 * 本地测试：开发人员，不需要连接硬件，完成功能的模拟。
 *     1 打开页面时，从数据库中请求默认值，
 *         获得数据源和没有value值数据点组成的结构--dataSourceMp，
 *         获得数据点组成的结构---dataSource
 *     2 分析render
 *         2.1 组件DataSourcePanel：实现对dataSourceMap 和dataSource的整合，
 *             生成左侧的树，修改对应数据点的值，实现组件Runtimer组件的渲染
 *             注意： 此时DataSourcePanel中的数据可以修改。
 *         2.2 组件JsonPanel: 提供了对 组件json的修改和实时渲染Runtimer组件的功能
 *         2.3 组件Runtimer: 实现对组件json 和 dataSource的关联，完成数据源与组件的绑定，
 *             实现人机交互。
 *      通过修改左侧的dataSourcePanel中的值，Runtimer的组件渲染。
 */
export default class LocalTest extends Component {
  // 参考父组件  Test.js 中的说明
  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    alertSource: PropTypes.object.isRequired,
    componentsJSon: PropTypes.object.isRequired,
    dataSourceMap: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    getDefaultValue: PropTypes.func.isRequired,
    onHandleClear: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired, // 设置父组件 state中的值
    onhandleClick: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    setDevice: PropTypes.func.isRequired, // 用于主备切换
    submitForm:PropTypes.func.isRequired,
    pageId:PropTypes.number.isRequired,
  };

  componentDidMount() {
    // 每次本组件渲染时，获得默认值
    this.props.getDefaultValue();
  }

  componentWillUnmount() {
    // 切换组件页面时，设置父组件中state的默认值
    this.props.onHandleClear();
  }

  render() {
    const { dataSource, dataSourceMap, onChange, alertSource, setAlert, componentsJSon, onhandleClick, setData, setDevice,submitForm,pageId } = this.props;
    return (
      <div>
        <div className="runtimertoolbar">
          <div className="floatl">
            <Button bsStyle="warning" onClick={this.props.onSave}>
              保存页面
            </Button>
          </div>
        </div>
        <div style={{ clear: "both", height: 5 }} />
        <div className="cvcontainer" style={{ clear: "both" }}>
          <ReflexContainer orientation="vertical">
            <ReflexElement className="left-pane" minSize="200" flex={0.15}>
              <div className="pane-content">
                <DataSourcePanel
                  dataSource={dataSource}
                  dataSourceMap={dataSourceMap}
                  onChange={onChange}
                  type="localTest"
                  alertSource={alertSource}
                  setAlert={setAlert}
                />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement className="middle-pane" minSize="200" maxSize="800" flex={0.5}>
              <div className="pane-content">
                <JsonPanel objects={componentsJSon} onhandleClick={onhandleClick} />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement className="right-pane" minSize="200">
              <div className="pane-content">
                <Runtimer
                  pageId={pageId}
                  objects={componentsJSon.objects}
                  dataSource={dataSource}
                  setData={setData}
                  alertSource={alertSource}
                  setAlert={setAlert}
                  setDevice={setDevice}
                  submitForm={submitForm}
                />
              </div>
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
      );
  }
}
