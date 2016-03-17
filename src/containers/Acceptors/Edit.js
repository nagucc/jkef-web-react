import { connect } from 'react-redux'
import Edit from '../../components/Jkef/Acceptors/Edit';
import * as actions from '../../redux/actions';
import {store} from '../../redux/store';
const mapStateToProps = (state, ownProps) => ({
	name: 'tst'
})

const mapDispatchToProps = dispatch => {
	let state = store.getState();
	let id = state.acceptorDetail._id;
	return {
		fetchAcceptor: () => dispatch(actions.fetchAcceptorById(id))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit);