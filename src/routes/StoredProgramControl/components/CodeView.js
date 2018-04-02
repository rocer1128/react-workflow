import React from "react";
import "components/styles/CodePage.scss";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Radium from "radium";
import DataSourcePanel from "../../../components/CellsArt/DataSourcePanel";
import Runtimer from "../../../components/CellsArt/Runtimer";
import JsonPanel from "../../../components/CellsArt/JsonPanel";

function CodeView({ ...props }) {
  let objects = {};
  let data = [];
  let id = null;
  let dataSource = {};
  if (props.currentPage) {
    objects = props.currentPage.process_control;
    data = props.currentPage.data.objects;
    id = props.currentPage.id;
  }

  if (props.dataSource) {
    dataSource = props.dataSource;
  }

  return (
    <div className="cvcontainer">
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" minSize="200" flex={0.2}>
          <div className="pane-content">
            <DataSourcePanel type="onLineTest" dataSourceMap={props.dataSourceMap} dataSource={props.dataSource} alertSource={props.alertSource} />
          </div>
        </ReflexElement>
        <ReflexSplitter propagate={true} />
        <ReflexElement className="middle-pane" minSize="200" flex={0.4}>
          <div className="pane-content">
            <JsonPanel objects={objects} onhandleClick={props.onhandleClick} />
          </div>
        </ReflexElement>
        <ReflexSplitter propagate={true} />
        <ReflexElement className="right-pane" minSize="200" maxSize="600">
          <div className="pane-content">
            <Runtimer pageId={id} objects={data} dataSource={dataSource} setData={props.setData} alertSource={props.alertSource} />
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
}

export default Radium(CodeView);
