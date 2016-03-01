import { connect } from 'react-redux'
import Stat from '../../components/Jkef/Stat';

const mapStateToProps = (state, ownProps) => {
	return {
		...state.jkefStat
	}
}
export default connect(mapStateToProps)(Stat);