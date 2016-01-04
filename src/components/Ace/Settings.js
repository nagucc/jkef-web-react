var React = require('react');

var Settings = React.createClass({

	render: function() {
		return (
			<div className="ace-settings-container" id="ace-settings-container">
                <div className="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                    <i className="ace-icon fa fa-cog bigger-130"></i>
                </div>

                <div className="ace-settings-box clearfix" id="ace-settings-box">
                    <div className="pull-left width-50">
                        <div className="ace-settings-item">
                            <div className="pull-left">
                                <select id="skin-colorpicker" className="hide">
                                    <option data-skin="no-skin" value="#438EB9">#438EB9</option>
                                    <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                                    <option data-skin="skin-2" value="#C6487E">#C6487E</option>
                                    <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
                                </select>
                            </div>
                            <span>&nbsp; Choose Skin</span>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-navbar" />
                            <label className="lbl" htmlFor="ace-settings-navbar"> Fixed Navbar</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-sidebar" />
                            <label className="lbl" htmlFor="ace-settings-sidebar"> Fixed Sidebar</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-breadcrumbs" />
                            <label className="lbl" htmlFor="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-rtl" />
                            <label className="lbl" htmlFor="ace-settings-rtl"> Right To Left (rtl)</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-add-container" />
                            <label className="lbl" htmlFor="ace-settings-add-container">
                                Inside
                                <b>.container</b>
                            </label>
                        </div>

                    </div>

                    <div className="pull-left width-50">
                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-hover" />
                            <label className="lbl" htmlFor="ace-settings-hover"> Submenu on Hover</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-compact" />
                            <label className="lbl" htmlFor="ace-settings-compact"> Compact Sidebar</label>
                        </div>

                        <div className="ace-settings-item">
                            <input type="checkbox" className="ace ace-checkbox-2" id="ace-settings-highlight" />
                            <label className="lbl" htmlFor="ace-settings-highlight"> Alt. Active Item</label>
                        </div>

                    </div>
                </div>
            </div>
		);
	}

});

module.exports = Settings;