import React from "react";
import Designer from "components/CellsArt/Designer";
import JsonPanel from "components/CellsArt/JsonPanel";
import DataSourcePanel from "components/CellsArt/DataSourcePanel";
import "components/styles/CodePage.scss";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Radium from "radium";

function CodePage({ ...props }) {
  return (
    <div className="cvcontainer">
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane" minSize="200" flex={0.15}>
          <div className="pane-content">
            <DataSourcePanel dataSourceMap={props.dataSource} isEditable={false} type="project" />
          </div>
        </ReflexElement>
        <ReflexSplitter propagate={true} />
        <ReflexElement className="middle-pane" minSize="200" maxSize="800" flex={0.5}>
          <div className="pane-content">
            <JsonPanel objects={props.data} onhandleClick={props.onBlur} />
          </div>
        </ReflexElement>
        <ReflexSplitter propagate={true} />
        <ReflexElement className="right-pane" minSize="200" maxSize="600">
          <div className="pane-content">
            <Designer viewBox={props.viewBox} objects={props.data} />
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
    );
}

export default Radium(CodePage);
