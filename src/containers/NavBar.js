import React from 'react';
import { connect } from 'react-redux'
import NavBar from '../components/Ace/NavBar';

const mapStateToProps = (state, ownProps) => {
	return {
		enableUserInfo: state.enableUserInfo
	}
}
export default connect(mapStateToProps)(NavBar);
