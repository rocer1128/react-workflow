import React, {
  Component
} from 'react';
import Radium from 'radium';
import _ from 'lodash';

import styles from '../panels/styles';
import Icon from '../Icon';
import Panel from '../panels/Panel';
import PropertyGroup from '../panels/PropertyGroup';
import Button from '../panels/Button';
import SwitchState from '../panels/SwitchState';
import Columns from '../panels/Columns';
import Column from '../panels/Column';

export default class NumberPanel extends Panel {

  render() {
    let {
      onChange,
      object
    } = this.props;
    let {
      style,
      data
    } = object;
    return (
      <PropertyGroup>
        <Columns label="ID">
          <Column showIf={_.has(object, 'id')} label="ID">
            <input style={[styles.input, styles.integerInput, {width: 50}]} value={object.id} readOnly/>
          </Column>
        </Columns>
        {_.has(data, 'num') && 
          <Columns label="编号">
     	     <Column showIf={_.has(data, 'num')} label="数字" value={data.num} onChange={this.props.onChange.bind(this, 'data.num', 'number')} />
            <Column showIf={_.has(style, 'fontSize')} label="字号" value={style.fontSize} onChange={this.props.onChange.bind(this, 'style.fontSize','number')}/>
          </Columns>
        }
        {_.has(data, 'max') && 
          <Columns label="最大值">
            <Column showIf={_.has(data, 'max')} label="数字" value={data.max} onChange={this.props.onChange.bind(this, 'data.max', 'number')} />
            <Column showIf={_.has(style, 'fontSize')} label="字号" value={style.fontSize} onChange={this.props.onChange.bind(this, 'style.fontSize','number')}/>
          </Columns>
        }
        {_.has(data, 'upLimit') && 
          <Columns label="上限">
            <Column showIf={_.has(data, 'upLimit')} label="上限" value={data.upLimit} onChange={this.props.onChange.bind(this, 'data.upLimit', 'number')} />
          </Columns>
        }
        {_.has(data, 'url') && 
          <Columns label="URL">
            <Column width={150} showIf={_.has(data, 'url')} label="URL" value={data.url} onChange={this.props.onChange.bind(this, 'data.url', 'string')} />
          </Columns>
        }
      {_.has(data, 'text') && 
          <Columns label="文字">
            <Column width={300} showIf={_.has(data, 'text')} label="文字" value={data.text} onChange={this.props.onChange.bind(this, 'data.text', 'string')} />
            <Column showIf={_.has(style, 'fontSize')} label="字号" value={style.fontSize} onChange={this.props.onChange.bind(this, 'style.fontSize','number')}/>
          </Columns>
        }
      </PropertyGroup>
    );
  }
}
