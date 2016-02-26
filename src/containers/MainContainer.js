import { connect } from 'react-redux'
import MainContainer from '../components/Ace/MainContainer';

const mapStateToProps = (state, ownProps) => {
	return {
		sidebarShortcuts: state.sidebarShortcuts,
		sidebarNavList: state.sidebarNavList,
		enableBreadcrumbs: state.enableBreadcrumbs,
		enableSettings: state.enableSettings
	}
}
export default connect(mapStateToProps)(MainContainer);
