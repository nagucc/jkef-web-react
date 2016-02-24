import React from 'react';
import { connect } from 'react-redux'
import MainContainer from '../components/Ace/MainContainer';

const mapStateToProps = (state, ownProps) => {
	console.log('state:', state);
	return {
		sidebarShortcuts: state.sidebarShortcuts
	}
}
export default connect(mapStateToProps)(MainContainer);
