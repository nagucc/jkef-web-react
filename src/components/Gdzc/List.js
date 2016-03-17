import React, { PropTypes } from 'react'

const List = React.createClass({
  static propTypes = {
    filter: React.PropTypes.object,
    items: PropTypes.array
  }
  render () {
    return (
      <div>
      	<div className="page-header pull-left">
      		<h1>
      			固定资产列表
      			<small>
      				<i className="ace-icon fa fa-angle-double-right"></i>

      			</small>
      		</h1>
      	</div>
      	<div className="pull-right">
      		<div className="nav-search" id="nav-search">
      	    <form className="form-search">
              <span className="input-icon">
                  <input type="text" style={{width:'250px'}} placeholder="搜索姓名／电话／证件号码" onChange={this.setFilters.bind(this)} className="nav-search-input" id="nav-search-input" ref="filter"/>
                  <i className="ace-icon fa fa-search nav-search-icon"></i>
              </span>
      		  </form>
      		</div>
      	</div>
      	<div className="row">
          <div className="col-xs-12" >

          </div>
      	</div>
      </div>
    )
  }
})

export default List
