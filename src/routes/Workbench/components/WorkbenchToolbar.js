import React, { Component, PropTypes } from "react";
import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";
import { CalculateObject } from "components/Common/CommonUtil";
import { Button, Modal, Form, FormGroup, Col, ControlLabel, FormControl } from "react-bootstrap";
import "./Workbench.scss";

export default class WorkbenchToolbar extends Component {

  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowSaveProject: false,
      isShowCreatePage: false,
      isShowDeletePage: false,
      isDisabledDelete: false,
      isShowSaveWidget: false,
      isDesignView: true,
      isCodeView: false,
      currentPageName: "",
      calcResult: null,
    };
    this.onAddPage = this.onAddPage.bind(this);
    this.closeAddPage = this.closeAddPage.bind(this);

    this.onChangePage = this.onChangePage.bind(this);
    this.onSaveProject = this.onSaveProject.bind(this);
    this.closeSaveProject = this.closeSaveProject.bind(this);
    this.onShowSaveWidget = this.onShowSaveWidget.bind(this);
    this.closeShowSaveWidget = this.closeShowSaveWidget.bind(this);
    this.saveWidget = this.saveWidget.bind(this);

    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPageName: nextProps.currentPage.name,
    });
    if (nextProps.currentPage.name === "主界面") {
      this.setState({
        isDisabledDelete: false,
      });
    } else {
      this.setState({
        isDisabledDelete: true,
      });
    }
  }

  onAddPage() {
    this.setState({
      isShowCreatePage: true,
    });
  }

  closeAddPage() {
    this.setState({
      isShowCreatePage: false,
    });
  }
  PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  }
  addPage() {
    let count = 0;
    const page = {
      project_id: this.props.id,
      name: this.pageName.value,
      data: {
        // id: this.PrefixInteger(this.props.pages.length + 1, 3),
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
    this.props.pages.map((item, key) => {
      if (page.name !== item.name) {
        count++;
      }
    });
    if (count === this.props.pages.length) {
      this.props.onAddPage(page);
    }
    this.closeAddPage();
  }

  onDeletePage() {
    this.setState({
      isShowDeletePage: true,
    });
  }

  closeDeletePage() {
    this.setState({
      isShowDeletePage: false,
    });
    this.setState({
      pageName: "",
    });
  }

  deletePage() {
    let pageId = "";
    for (let i = 0; i < this.props.pages.length; i++) {
      if (this.props.pages[i].name === this.state.currentPageName) {
        pageId = this.props.pages[i].id;
      }
    }
    this.props.onDelete(pageId);
    this.closeDeletePage();
  }

  onChangePage(e) {
    this.setState({
      currentPageName: e.target.value,
    });
    if (e.target.value === "主界面") {
      this.setState({
        isDisabledDelete: false,
      });
    } else {
      this.setState({
        isDisabledDelete: true,
      });
    }
    this.props.onChangePage(e.target.value);
  }

  onShowDesignView() {
    this.setState({
      isDesignView: true,
      isCodeView: false,
    });
    this.props.onChangeView("design");
  }

  onShowCodeView() {
    this.setState({
      isDesignView: false,
      isCodeView: true,
    });
    this.props.onChangeView("code");
  }

  onShowSaveWidget() {
    if (this.props.currentPage.data.objects.length === 0) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, "当前界面没有任何组件", "");
    } else {
      this.setState({
        isShowSaveWidget: true,
        calcResult: CalculateObject(this.props.currentPage.data.objects),
      });
    }
  }

  closeShowSaveWidget() {
    this.setState({
      isShowSaveWidget: false,
    });
  }
  saveWidget() {
    const widgetBasicInfo = {
      name: this.widgetName.value,
      category: this.widgetCategory.value,
      group: this.widgetGroup.value,
    };
    this.props.onSaveWidget(widgetBasicInfo, this.widgetWidth.value, this.widgetHeight.value);
    this.closeShowSaveWidget();
  }

  onSaveProject() {
    let nullObjects = [];
    this.props.pages.map((item, index) => {
      if (item.data.objects.length === 0) {
        nullObjects.push(item);
      }
    });
    if (nullObjects.length != 0) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, "界面必须存在一个组件", "");
    } else {
      this.setState({
        isShowSaveProject: true,
      });
    }
  }


  closeSaveProject() {
    this.setState({
      isShowSaveProject: false,
    });
  }

  onSave() {
    this.props.onSave(this.projectHeight.value, this.projectWidth.value);
    this.closeSaveProject();
  }

  render() {
    return (
      <div className="workbenchtoolbar">
        {this.props.from != "widget" &&
         <div className="floatl">
           <FormControl componentClass="select" value={this.state.currentPageName} onChange={this.onChangePage}>
             {this.props.pages.map((item, index) => <option key={index} value={item.name}>
                                                      {item.name}
                                                    </option>)}
           </FormControl>
         </div>}
        {this.props.from != "widget" &&
         <div className="floatl">
           <Button bsStyle="primary" style={{ marginLeft: 3 }} onClick={this.onAddPage}>
             添加
           </Button>
           <Button bsStyle="warning" style={{ marginLeft: 3 }} onClick={this.onShowSaveWidget}>
             存为组件
           </Button>
           <Button bsStyle="warning" style={{ marginLeft: 3 }} onClick={this.onSaveProject}>
             保存工程
           </Button>
           {this.state.isDisabledDelete === true &&
            <Button bsStyle="danger" style={{ marginLeft: 3 }} onClick={this.onDeletePage.bind(this)}>
              删除
            </Button>}
           {this.state.isDisabledDelete === false &&
            <Button bsStyle="danger" disabled style={{ marginLeft: 3 }}>
              删除
            </Button>}
         </div>}
        {this.props.from === "widget" &&
         <Button bsStyle="warning" style={{ marginLeft: 3 }} onClick={this.props.onUpdateWidget}>
           保存组件
         </Button>}
        <div className="floatr">
          <Button bsStyle="success" disabled={this.state.isDesignView} style={{ marginRight: 3 }} onClick={this.onShowDesignView.bind(this)}>
            设计视图
          </Button>
          <Button bsStyle="success" disabled={this.state.isCodeView} style={{ marginRight: 3 }} onClick={this.onShowCodeView.bind(this)}>
            代码视图
          </Button>
        </div>
        <Modal show={this.state.isShowCreatePage} onHide={this.closeAddPage}>
          <Modal.Header closeButton>
            <Modal.Title>
              添加界面
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}> 界面名称
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="界面名称" inputRef={ref => {
                                                                        this.pageName = ref
                                                                      }} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.addPage.bind(this)}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeAddPage}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowSaveProject} onHide={this.closeSaveProject}>
          <Modal.Header closeButton>
            <Modal.Title>
              保存工程
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup controlId="projectWidth">
                <Col componentClass={ControlLabel} sm={3}> 宽度
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="宽度" inputRef={ref => {
                                                                      this.projectWidth = ref
                                                                    }} defaultValue={this.props.currentPage.data != undefined ? this.props.currentPage.data.styles.width : 0} />
                </Col>
              </FormGroup>
              <FormGroup controlId="projectHeight">
                <Col componentClass={ControlLabel} sm={3}> 高度
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="高度" inputRef={ref => {
                                                                      this.projectHeight = ref
                                                                    }} defaultValue={this.props.currentPage.data != undefined ? this.props.currentPage.data.styles.height : 0} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onSave.bind(this)}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeSaveProject}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowDeletePage} onHide={this.closeDeletePage.bind(this)} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              删除
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确定删除界面?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.deletePage.bind(this)}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeDeletePage.bind(this)}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowSaveWidget} onHide={this.closeShowSaveWidget}>
          <Modal.Header closeButton>
            <Modal.Title>
              另存为组件
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}> 组件名称
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="界面名称" inputRef={ref => {
                                                                        this.widgetName = ref
                                                                      }} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formCategory">
                <Col componentClass={ControlLabel} sm={3}> 分类
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" placeholder="选择分类..." inputRef={ref => this.widgetCategory = ref}>
                  <option value="common">
                    通用
                  </option>
                  <option value="scada">
                    电力
                  </option>
                  <option value="fui">
                    表单
                  </option>
                </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formGroup">
                <Col componentClass={ControlLabel} sm={3}> 分组
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" placeholder="选择分组..." inputRef={ref => this.widgetGroup = ref}>
                  <option value="base">
                    基本形状
                  </option>
                  <option value="common">
                    常用控件
                  </option>
                  <option value="container">
                    容器控件
                  </option>
                </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="widgetWidth">
                <Col componentClass={ControlLabel} sm={3}> 宽度
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="宽度" defaultValue={this.state.calcResult ? this.state.calcResult.cellWidth : 500} inputRef={ref => {
                                                                                                                                                   this.widgetWidth = ref
                                                                                                                                                 }} />
                </Col>
              </FormGroup>
              <FormGroup controlId="widgetHeight">
                <Col componentClass={ControlLabel} sm={3}> 高度
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="高度" defaultValue={this.state.calcResult ? this.state.calcResult.cellHeight : 500} inputRef={ref => {
                                                                                                                                                    this.widgetHeight = ref
                                                                                                                                                  }} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.saveWidget}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeShowSaveWidget}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>);
  }
}
