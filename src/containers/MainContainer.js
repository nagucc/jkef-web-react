import { connect } from 'react-redux'
import MainContainer from '../components/Ace/MainContainer';

const mapStateToProps = (state, ownProps) => {
	return {
		sidebarShortcuts: state.mainContainer.sidebarShortcuts,
		sidebarNavList: state.mainContainer.sidebarNavList,
		enableSettings: state.enableSettings,
		breadcrumbs: state.mainContainer.breadcrumbs
	}
}
export default connect(mapStateToProps)(MainContainer);
