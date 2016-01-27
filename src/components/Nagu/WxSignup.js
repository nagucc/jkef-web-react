var React = require('react');
import fetch from '../../core/fetch';
import URLSearchParams from 'url-search-params';
import $ from 'jquery';

var WxSignup = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			mobile: '' 
		};
	},

	/*
	返回一个用于获取有value属性的字段的值的方法。主要提供给诸如input等字段的onchange事件使用。
	参数：
		- name： 字段对应States里面的值，可以使用"."分割。
	*/
	getValueFieldHandler: function (name) {
		return (e) => {
			var value = e.target.value;
			this.setState((previousState) => {
				var names = name.split('.');
				var tmp = previousState;
				for(var i = 0; i < names.length - 1; i++) {
					tmp = tmp[names[i]];
				}
				tmp[names[names.length-1]] = value;
				return previousState;
			})
		};
	},
	submit: function () {
		// var params = new URLSearchParams();
		// for(var key in this.state) {
		// 	params.append(key, this.state[key]);
		// }
		// fetch('/api/wx-ent/signup', {
		// 	method: 'post',
		// 	body: 'test=value'
		// }).then((res) => {
		// 	console.log(res);
		// });
		$.post('/api/wx-ent/signup', this.state).done((result)=>{
			if(result.ret === 0) {
				alert('注册成功。\n请进入企业号进行验证。');
				this.setState({
					name: '',
					mobile: ''
				});
			} else {
				alert(`注册失败：[${result.ret}]${result.msg}`);
			}
		});
	},
	render: function() {
		return (
<div className="main-content">
	<div className="main-content-inner">

		<div className="page-content">
			<div className="page-header">
				<h1>
					用户注册
					<small>
						<i className="ace-icon fa fa-angle-double-right"></i>
						纳谷社区
					</small>
				</h1>
			</div>
			<div className="row">
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-3 control-label no-padding-right" htmlFor="name"> 姓名 </label>

						<div className="col-sm-9">
							<input type="text" id="name" placeholder="姓名" className="col-xs-10 col-sm-5" value={this.state.name} onChange={this.getValueFieldHandler('name')} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-3 control-label no-padding-right" htmlFor="mobile"> 手机号 </label>

						<div className="col-sm-9">
							<input type="text" id="mobile" placeholder="手机号" className="col-xs-10 col-sm-5" value={this.state.mobile} onChange={this.getValueFieldHandler('mobile')}/>
						</div>
					</div>
					<div className="clearfix form-actions">
						<div className="col-md-offset-3 col-md-9">
							<button className="btn btn-info" onClick={this.submit} >
								<i className="ace-icon fa fa-check bigger-110"></i>
								提交
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = WxSignup;