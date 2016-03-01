import { connect } from 'react-redux'
import Index from '../../components/Jkef/Acceptors';
import * as actions from '../../redux/actions';

const mapStateToProps = (state, ownProps) => {
	let yearRange = [];
	for(var i = 2006; i <= (new Date()).getFullYear(); i ++){
		yearRange.push(i);
	}
	return {
		yearRange, 
		...state.acceptorList
	}
}

const mapDispatchToProps = dispatch => ({
	moreAcceptors: () => dispatch(actions.fetchAcceptorList()),
	setAcceptorListFilter: params => dispatch(actions.setAcceptorListFilter(params))
})
export default connect(mapStateToProps, mapDispatchToProps)(Index);