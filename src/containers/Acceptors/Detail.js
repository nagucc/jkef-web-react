import { connect } from 'react-redux'
import Detail from '../../components/Jkef/Acceptors/Detail';
import * as actions from '../../redux/actions';
import {store} from '../../redux/store';
const mapStateToProps = (state, ownProps) => ({
	...state.acceptorDetail
})

const mapDispatchToProps = dispatch => {
	let state = store.getState();
	let id = state.acceptorDetail._id;
	return {
		fetchAcceptor: () => dispatch(actions.fetchAcceptorById(id))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);