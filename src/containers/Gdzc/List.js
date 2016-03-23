import { connect } from 'react-redux'
import List from '../../components/Gdzc/List';

const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.itemsFilter,
    items: state.items
  };
};

export default connect(mapStateToProps)(List);
