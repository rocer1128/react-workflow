import React, { Component, PropTypes } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import { RESOURCE_TYPE, COMPONENT_GROUP } from "../../../components/Common/ComponentConstant";
import { createOpt } from "../../../components/Common/CommonUtil";
import "./Widget.scss";

export default class Search extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired, // 搜索组件
  };

  /**
   *根据条件进行搜索
   */
  onSearch = () => {
    const searchInfo = [];
    if (this.filterTextInput.value && this.filterTextInput.value !== "0") {
      searchInfo.push(["name", "=", this.filterTextInput.value]);
    }
    if (this.selectCategory.value && this.selectCategory.value !== "0") {
      searchInfo.push(["category", "=", this.selectCategory.value]);
    }
    if (this.selectGroup.value && this.selectGroup.value !== "0") {
      searchInfo.push(["group", "=", this.selectGroup.value]);
    }
    console.log(searchInfo);
    this.props.onSearch(searchInfo);
  };

  render() {
    const categoryTypeOpt = createOpt(RESOURCE_TYPE);
    const groupTypeOpt = createOpt(COMPONENT_GROUP);
    return (
      <Form inline className="searchbar">
        <FormGroup controlId="Searchbar">
          <FormControl type="text" placeholder="组件名称" inputRef={ref => (this.filterTextInput = ref)} />
        </FormGroup>
        <FormGroup controlId="formControlsSelect" className="marginl">
          <FormControl componentClass="select" placeholder="select" inputRef={ref => (this.selectCategory = ref)}>
            <option value="0" key={0}>
              类型
            </option>
            {categoryTypeOpt}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect" className="marginl">
          <FormControl componentClass="select" placeholder="select" inputRef={ref => (this.selectGroup = ref)}>
            <option value="0" key={0}>
              分组
            </option>
            {groupTypeOpt}
          </FormControl>
        </FormGroup>
        <Button onClick={this.onSearch} bsStyle="primary" className="marginl">
          搜索
        </Button>
      </Form>
    );
  }
}
