import { connect } from 'react-redux'
import Projects from '../components/Projects';


const mapStateToProps = (state, ownProps) => {
	return {
		projects: state.projects
	}
}
export default connect(mapStateToProps)(Projects);