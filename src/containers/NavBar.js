import React from 'react';
import { connect } from 'react-redux'
import NavBar from '../components/Ace/NavBar';

const mapStateToProps = (state, ownProps) => {
	return {
		enableUserInfo: state.navbar.enableUserInfo,
		title: state.navbar.title
	}
}
export default connect(mapStateToProps)(NavBar);
