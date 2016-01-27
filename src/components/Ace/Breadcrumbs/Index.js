var React = require('react');

import Search from './Search';
import Items from './Items';

var Breadcrumbs = React.createClass({
    getDefaultProps: function() {
        return {
            items: [],
            onSearchTextChange: event => {}
        };
    },
	render: function() {
        var items = null;
        if(this.props.items.length) items = <Items {...this.props} />;
		return (
			<div className="breadcrumbs" id="breadcrumbs">
                {items}
                <Search onSearchTextChange={this.props.onSearchTextChange} placeholder={this.props.searchPlaceHodler} />
            </div>
		);
	}

});

module.exports = Breadcrumbs;