import { connect } from 'react-redux'
import Upload from '../components/Upload';

const mapStateToProps = (state, ownProps) => {
  var props = {showButton: true, ...state.pageSetting};
  if(state.mergeXls && state.mergeXls.status === 'processing'){
    Object.assign(props, {status: {
      text: `正在合并文件“${state.mergeXls.file}”的数据，请稍候。`,
      style: 'warning'
    }, showButton: false});
  } else if(state.mergeXls === 'done') {
    Object.assign(props, {status: {
      text: '数据已合并成功。',
      style: 'success'
    }});
  }
  return props;
};

export default connect(mapStateToProps)(Upload);
