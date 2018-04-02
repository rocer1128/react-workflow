import React, { Component } from "react";
import { Map, Polyline, Markers, Circle, Marker } from "react-amap";
import Select from "react-select";
import { browserHistory } from "react-router";
import { FormGroup, Form, Row, Grid, Button, Col, FormControl, ButtonToolbar } from "react-bootstrap";
import "react-select/dist/react-select.css";
import __ from "lodash";
import { GIS_CATEGORY_TYPES } from "components/Common/ComponentConstant";
import systemMonitor from "../assets/systemMonitor.png";
import apk from "../assets/apk.png";
import box from "../assets/box.png";
import camera from "../assets/camera.png";
import marker from "../assets/marker.png";
import tools from "../assets/tools.png";

export default class GisMap extends Component {
  /**
   * 构造函数
   * 用于定义state
   */
  constructor(props) {
    super(props);
    this.oneMarkerEvents = {
      click: (MapsOption) => {
        const position = {
          longitude: MapsOption.lnglat.getLng(),
          latitude: MapsOption.lnglat.getLat(),
        }
        this.props.setPosition(position);
      },
      dragstart: (MapsOption) => {
        const position = {
          longitude: MapsOption.lnglat.getLng(),
          latitude: MapsOption.lnglat.getLat(),
        }

        this.props.setPosition(position);
      },
      dragend: (MapsOption) => {
        const position = {
          longitude: MapsOption.lnglat.getLng(),
          latitude: MapsOption.lnglat.getLat(),
        }
        this.props.setPosition(position);
      }
    };

    this.markerEvents = {
      created: (instance) => {
        if (instance.length) {
          this.instances = instance;
        }
      },
      click: (MapsOption, marker) => {
        if (MapsOption) {
          // const extData = marker.getExtData();
          const instances = __.slice(this.instances, 0);
          __.pull(instances, MapsOption.target);
          instances.map((ins, key) => {
            ins.render(this.renderMarkerLayout);
          });
          this.props.getoptMarker(MapsOption.target.G.extData);
          marker.render(this.renderMarkerClickLayout);
        }
      },
      dblclick: (MapsOption) => {
        if (MapsOption) {
          if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS|Android 
            browserHistory.push(`/realTimePage?id=${MapsOption.target.G.extData.projectId}&key=${MapsOption.target.G.extData.indexId}`);
          } else {
            // window.open(`/projectMonitor?id=${MapsOption.target.G.extData.projectId}&key=${MapsOption.target.G.extData.indexId}`);
            browserHistory.push(`/projectMonitor?id=${MapsOption.target.G.extData.projectId}&key=${MapsOption.target.G.extData.indexId}`);
          }
        }
      },
    };

    this.style = {
      // background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      width: "30px",
      height: "30px",
      color: "#000",
    }

  }

  componentWillMount() {
    this.props.setPosition(this.props.center);
  }

  /*根据分类显示*/
  renderMarkerLayout(extData) {
    if (extData.category === "scada") {
      return <img src={systemMonitor} />;
    }

    if (extData.category === "fui") {
      return <img src={apk} />;
    }
    if (extData.category === "video") {
      return <img src={camera} />;
    }
  }

  /*点击地图上的图标时，为该图片加上边框*/
  renderMarkerClickLayout(extData) {
    const style = {
      border: "3px dashed #ff0000",
    };

    if (extData.category === "scada") {
      return <img src={systemMonitor} style={style} />;
    }
    if (extData.category === "fui") {
      return <img src={apk} style={style} />;
    }
    if (extData.category === "video") {
      return <img src={camera} style={style} />;
    }

  }

  render() {
    const { center, newMarkers, markerShow, listPath } = this.props;
    const list = Object.keys(listPath);
    return (
      <Row>
        <div style={{ width: "100%", height: "calc(100vh - 150px)" }}>
          <Map amapkey={"39dcd32887fe0a985a033e6e3f20f45f"} plugins={["ToolBar", "Scale", "OverView"]} zoom={6} center={center}>
            <Markers markers={newMarkers} events={this.markerEvents} render={this.renderMarkerLayout} useCluster={false} />
            {list.length && list.map((item, key) => {
               const items = listPath[item];
               const path = [];
               items.map((item, key) => {
                 path.push(item.position);
               });
               return <Polyline key={key} path={path} style={{ strokeColor: "#2B65EC", strokeWeight: 3, strokeStyle: "dashed", strokeDasharray: [10, 5] }} visible={true}>
                      </Polyline>
             })}
            <Marker
              position={center}
              events={this.oneMarkerEvents}
              visible={markerShow}
              draggable={true}
              zIndex={200}
              topWhenMouseOver={true}
              topWhenClick={true}
            >
              <img src={marker} style={this.style}></img>
            </Marker>
          </Map>
        </div>
      </Row>
      );
  }
}
