import React, { PropTypes } from 'react'
import {Alert, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';

import * as actions from '../redux/actions';

const Upload = React.createClass({
  upload () {
    var files = findDOMNode(this.refs.xls).files;
    if(files.length){
      this.props.dispatch(actions.startToUploadXls(files[0].name));
      this.props.dispatch(actions.uploadXls(files[0]));
    }
  },
  render () {
    return (
      <div className="row">
        <h3 className="header blue smaller">{this.props.title}</h3>
        <div className="col-xs-12">
          {
            this.props.status
            ? <Alert bsStyle={this.props.status.style}>{this.props.status.text}</Alert>
          : null
          }

          <div className="form-group">
            <label className="control-label" >
              <span > {this.props.label} </span>
            </label>
            <input type="file" label="file label"  ref="xls"/>
            <span className="help-block" >
              {this.props.help}
            </span>
          </div>
          {
            this.props.showButton ? <Button onClick={this.upload}>确定</Button>: null
          }
        </div>

      </div>
    )
  }
})

export default Upload
