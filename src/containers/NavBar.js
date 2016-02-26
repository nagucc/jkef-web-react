import React from 'react';
import { connect } from 'react-redux'
import NavBar from '../components/Ace/NavBar';

const mapStateToProps = (state, ownProps) => {
	return {
		enableUserInfo: state.enableUserInfo,
		title: state.title
	}
}
export default connect(mapStateToProps)(NavBar);
