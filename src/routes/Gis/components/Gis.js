import React, { Component, PropTypes } from "react";
import "react-select/dist/react-select.css";
import __ from "lodash";
import { GIS_CATEGORY_TYPES } from "components/Common/ComponentConstant";
import { Grid } from "react-bootstrap";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";
import systemMonitor from "../assets/systemMonitor.png";
import apk from "../assets/apk.png";
import box from "../assets/box.png";
import camera from "../assets/camera.png";
import tools from "../assets/tools.png";
import GisOperation from "./GisOperation";
import GisMap from "./GisMap";


export default class Gis extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    gis: PropTypes.object.isRequired,
    initGisInfo: PropTypes.func.isRequired, // 获得初始的全部gis数据
    initProjectList: PropTypes.func.isRequired,
    createGisInfo: PropTypes.func.isRequired, // 添加gis数据
    delGisInfo: PropTypes.func.isRequired, // 删除Gis数据
    groupMarkers: PropTypes.func.isRequired,
    searchPages: PropTypes.func.isRequired,
    searchPageIds: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth.id, // 用户ID
      // selectValues: [{
      //   label: "PSCADA",
      //   value: "1"
      // }],
      selectValues: [],
      center: {
        longitude: 119.6961400000,
        latitude: 35.6453300000,

      },
      position: {}, // 添加一个Gis信息的经纬度
      markerShow: false, // 添加标记的出现
      delShow: false, // 删除按钮的显示
      gis: null, // 删除的gis信息
    };
  }

  componentWillMount() {
    this.props.initGisInfo();
    this.props.initProjectList();
    this.props.searchPageIds();
  }


  handleSelectChange = (markers, objects) => {
    if (objects) {
      let markerGroup = __.groupBy(markers, marker => marker.category); // 根据categroy进行分组

      let newMarkers = [];
      objects.forEach(object => {
        if (markerGroup[object.value]) {
          newMarkers = [...newMarkers, ...markerGroup[object.value]];

        }
      });
      this.props.groupMarkers(newMarkers);
    }
    // } else {
    //   // this.props.groupMarkers(markers);

    // }
    this.setState({
      selectValues: objects,
    });
  }


  setMarkerVisual = () => { // 添加标记的显示
    this.setState({
      markerShow: !this.state.markerShow
    });
  }


  searchPages = (projectId, listPageId) => { // 查询相应工程下的page页面
    this.props.searchPages(projectId, listPageId);
  }


  addOperation = (gis) => { // 添加操作
    this.props.createGisInfo(gis);
  }

  deleteOperation = (gisId) => { // 删除操作
    this.props.delGisInfo(gisId);
  }

  getoptMarker = (gis) => { // 标记要删除的工程的gis信息
    if (gis) {
      this.setState({
        gis,
        delShow: true,
      });
    }
  }

  setPosition = (position) => { // 设置添加标记的位置
    this.setState({
      position
    })
  }

  componentWillReceiveProps(nextProps) {
    const { auth, gis, project } = nextProps;
    if (nextProps.gis.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.gis.operation, "GIS信息");
      this.props.initGisInfo();
      this.props.searchPageIds();
    }
    // else if (this.state.selectValues.length && nextProps.gis.init === true) {
    else if (nextProps.gis.init === true) {
      this.handleSelectChange(nextProps.gis.markers, this.state.selectValues);
    } else if (nextProps.gis.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.gis.error.code], "GIS信息");
    }
  }
  render() {
    return (
      <Grid>
        <GisOperation
          markers={this.props.gis.markers}
          listPath={this.props.gis.listPath}
          listProject={this.props.gis.listProject}
          listPageId={this.props.gis.listPageId}
          pages={this.props.gis.pages}
          options={this.props.gis.options}
          handleSelectChange={this.handleSelectChange}
          selectValues={this.state.selectValues}
          addGisInfo={this.addOperation}
          delGisInfo={this.deleteOperation}
          searchPages={this.searchPages}
          setMarkerVisual={this.setMarkerVisual}
          position={this.state.position}
          markerShow={this.state.markerShow}
          delShow={this.state.delShow}
          gis={this.state.gis}
        />
        <GisMap
          center={this.state.center}
          newMarkers={this.props.gis.newMarkers}
          listPath={this.props.gis.listPath}
          markerShow={this.state.markerShow}
          setPosition={this.setPosition}
          getoptMarker={this.getoptMarker}
        />
      </Grid>
      );
  }

}
