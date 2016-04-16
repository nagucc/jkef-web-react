import { connect } from 'react-redux'
import Detail from '../components/Detail';

const mapStateToProps = (state, ownProps) => {
  let items = [], title = '';
  if(state.detail) {
    for (var key in state.detail) {
      if(key == '_id' || key == '设备名称') continue;
      if(state.detail[key])
        items.push({
          name: key,
          value: state.detail[key]
        });
    }
    title = state.detail['设备名称'];
  }
  return {items, title};
};

export default connect(mapStateToProps)(Detail);
