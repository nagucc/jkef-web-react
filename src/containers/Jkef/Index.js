import React from 'react';
import { connect } from 'react-redux'
import Index from '../../components/Jkef/Index';

const mapStateToProps = (state, ownProps) => {
	return {
		enableUserInfo: 'testt'
	}
}
export default connect(mapStateToProps)(Index);
