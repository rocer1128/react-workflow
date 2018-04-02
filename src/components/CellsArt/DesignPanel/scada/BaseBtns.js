import React, {
  Component,
} from 'react';
import {
  Modal,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

export default class BaseBtns extends Component {

  static propTypes = {
    onHandleSave: React.PropTypes.func,
    onHandleClear: React.PropTypes.func,
    onHandleReload: React.PropTypes.func,
    canSave: React.PropTypes.bool
  };

  state = {
    isShowSave: false,
    isShowReload: false,
    category: '',
    desc: '',
    reloadJson: ''
  }

  close() {
    this.setState({
      isShowSave: false
    });
  }

  open() {
    this.setState({
      isShowSave: true
    });
  }

  closeReload() {
    this.setState({
      isShowReload: false
    });
  }

  openReload() {
    this.setState({
      isShowReload: true
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.getAttribute('type')]: event.target.value
    });
  }
  handleReloadChange(event) {
    this.setState({
      reloadJson: event.target.value
    });
  }

  handleConfirm() {
    this.close();
    const {
      category,
      desc
    } = this.state;
    this.props.onHandleSave(category, desc);
    this.setState({
      category: '',
      desc: ''
    });
  }

  handleReloadConfirm() {
    this.closeReload();
    const {
      reloadJson,
    } = this.state;
    this.props.onHandleReload(reloadJson);
    this.setState({
      reloadJson: '',
    });
  }

  render() {
    return (
      <div className="pull-right">
        <ButtonGroup>
          <Button bsSize="lg" bsStyle="primary" onClick={this.open.bind(this)} disabled={!this.props.canSave}>保存</Button>
          <Button bsSize="lg" bsStyle="warning" onClick={this.props.onHandleClear.bind(this)}>清空</Button>
          <Button bsSize="lg" bsStyle="info" onClick={this.openReload.bind(this)}>重载</Button>
        </ButtonGroup>
        <Modal show={this.state.isShowSave} onHide={this.close.bind(this)} ariaLabelledby="contained-modal-title-lg">
              <Modal.Header closeButton>
                <Modal.Title>保存组件</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      分类
                    </Col>
                    <Col sm={8}>
                      <FormControl value={this.state.category} type="category" onChange={this.handleChange.bind(this)} placeholder="分类" />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                      描述
                    </Col>
                    <Col sm={8}>
                      <FormControl value={this.state.desc} type="desc" onChange={this.handleChange.bind(this)} placeholder="描述" />
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.handleConfirm.bind(this)}>确认</Button>
              </Modal.Footer>
        </Modal>
        <Modal bgSize="large" show={this.state.isShowReload} onHide={this.closeReload.bind(this)} ariaLabelledby="contained-modal-title-lg">
              <Modal.Header closeButton>
                <Modal.Title>重载组件</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup>
                    <Col sm={12}>
                      <FormControl value={this.state.reloadJson} onChange={this.handleReloadChange.bind(this)} style={{resize: 'none', height: 600}} componentClass="textarea" placeholder="粘贴JSON" />
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.handleReloadConfirm.bind(this)}>确认</Button>
              </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
