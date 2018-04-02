import React, { Component } from "react";
import Select from "react-select";
import { browserHistory } from "react-router";
import { FormGroup, Form, Row, Grid, Button, Col, FormControl, ButtonToolbar, Modal, ControlLabel } from "react-bootstrap";
import "react-select/dist/react-select.css";
import __ from "lodash";
import { GIS_CATEGORY_TYPES } from "components/Common/ComponentConstant";

export default class GisOperation extends Component {
  /**
   * 构造函数
   * 用于定义state
   */
  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false,
    };
  }

  /**添加gis信息时显示模态框**/
  showModal = () => {
    const { listProject, listPageId } = this.props;
    if (listProject.length) {
      const pid = listProject[0].id;
      this.props.searchPages(pid, listPageId);
    }
    this.setState({
      isShowAdd: true
    });
  }

  /**关闭模态框**/
  closeModal = () => {
    this.setState({
      isShowAdd: false,
    });
  }


  handleProChange = e => {
    // const obj = document.getElementById("project");
    // console.log("obj", obj, e.target);
    // var index = e.target.selectedIndex;
    // var name = e.target.options[index].getAttribute("name");
    if (parseInt(e.target.value) !== 0) {
      this.props.searchPages(parseInt(e.target.value), this.props.listPageId);
    }

  }

  /*添加一个Gis信息*/
  addGisInfo = () => {
    let content = "";
    let offset = {
      x: 0,
      y: 0,
    };
    const pageId = this.page.value;
    const index = this.page.selectedIndex;
    const indexId = this.page.options[index].getAttribute("name");
    const projectId = this.project.value;
    if (this.offsetX.value && this.offsetY.value) {
      offset = {
        x: parseInt(this.offsetX.value),
        y: parseInt(this.offsetY.value),
      }
    }

    const gisInfo = {
      projectId: parseInt(projectId, 10),
      pageId: parseInt(pageId, 10),
      label: {
        content: this.title.value,
        offset: offset,
      },
      name: this.title.value,
      category: this.category.value,
      position: this.props.position,
      indexId: parseInt(indexId),
    };
    this.props.addGisInfo(gisInfo);
    this.closeModal();
    this.props.setMarkerVisual();
  }

  /*删除Gis信息*/
  delGisInfo = () => {
    // const projectId = this.props.gis.projectId;
    // const pageId = this.props.gis.pageId;
    const gis = this.props.gis;
    this.props.delGisInfo(gis.id);
  }

  toProject() {
    browserHistory.push("/project");
  }


  render() {
    const { selectValues, markers, options, handleSelectChange, setMarkerVisual, delShow, position, listProject, searchPages, pages, gisInfo } = this.props;
    let count = 0;
    return (
      <Row>
        <Col sm={5} md={5}>
        <Form inline>
          <FormGroup style={{ paddingLeft: 5, paddingRight: 10, minWidth: "150px" }}>
            <Select
              noResultsText={"没有站点"}
              onChange={handleSelectChange.bind(this, markers)}
              placeholder="请选择站点分类"
              multi
              value={selectValues}
              options={options}
            />
          </FormGroup>
        </Form>
        </Col>
        <Col sm={7} md={7} style={{ textAlign: "right" }}>
        <Form inline>
          {!this.props.markerShow && <Button bsStyle="primary" onClick={setMarkerVisual}>
                                       标记
                                     </Button>}
          {this.props.markerShow && <Button bsStyle="primary" onClick={setMarkerVisual}>
                                      取消
                                    </Button>}
          <Button bsStyle="primary" onClick={this.showModal} disabled={!this.props.markerShow}>
            添加
          </Button>
          <Button bsStyle="primary" disabled={!delShow} onClick={this.delGisInfo}>
            删除
          </Button>
          {/*<Button bsStyle="primary" onClick={this.toProject}>工程部署</Button>*/}
        </Form>
        </Col>
        <Col>
        <Modal show={this.state.isShowAdd} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              添加GIS信息
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}> 名称
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="名称" inputRef={ref => (this.title = ref)} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}> 所属工程
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" inputRef={ref => (this.project = ref)} onChange={this.handleProChange}>
                  {/*<option value={0}> {"请选择工程"}  </option>*/}
                  {listProject.length && listProject.map((project, key) => {
                     return (
                       <option key={key} value={project.id} name={project.name}>
                         {project.name}
                       </option>)
                   })}
                  {!listProject.length && <option value={"kl"}>
                                            {"无可选工程"}
                                          </option>}
                </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}> 所属页面
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" inputRef={ref => (this.page = ref)}>
                  {Object.keys(pages).length && pages.map((page, key) => {
                     return (
                       <option key={key} value={page.id} name={page.id}>
                         {page.name}
                       </option>)
                   }
                   )}
                  {!Object.keys(pages).length && <option>
                                                   {"当前工程下无可选页面"}
                                                 </option>}
                </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}> 分类选择
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" inputRef={ref => (this.category = ref)}>
                  {/*<option value={"common"}>{GIS_CATEGORY_TYPES.common}</option>*/}
                  <option value={"scada"}>
                    {GIS_CATEGORY_TYPES.scada}
                  </option>
                  <option value={"fui"}>
                    {GIS_CATEGORY_TYPES.fui}
                  </option>
                  <option value={"video"}>
                    {GIS_CATEGORY_TYPES.video}
                  </option>
                </FormControl>
                </Col>
              </FormGroup>
            </Form>
            <Form horizontal>
              <FormGroup>
                <Col sm={3} componentClass={ControlLabel}> 偏移量
                </Col>
                <Col sm={4}>
                <FormControl type="text" placeholder="0" inputRef={ref => (this.offsetX = ref)} />
                </Col>
                <Col sm={4} smoffset={1}>
                <FormControl type="text" placeholder="0" inputRef={ref => (this.offsetY = ref)} />
                </Col>
              </FormGroup>
            </Form>
            <Form horizontal>
              {Object.keys(position).length && <FormGroup>
                                                 <Col sm={3} componentClass={ControlLabel}> 经度
                                                 </Col>
                                                 <Col sm={8}>
                                                 <FormControl type="text" value={this.props.position.longitude} disabled={true} />
                                                 </Col>
                                               </FormGroup>}
              {Object.keys(position).length && <FormGroup>
                                                 <Col sm={3} componentClass={ControlLabel}> 纬度
                                                 </Col>
                                                 <Col sm={8}>
                                                 <FormControl type="text" value={this.props.position.latitude} disabled={true} />
                                                 </Col>
                                               </FormGroup>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addGisInfo}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        </Col>
      </Row>
      );
  }
}
