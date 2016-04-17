import { connect } from 'react-redux'
import Index from '../components/Index';

const mapStateToProps = (state, ownProps) => {
  let total = {
    amount:0, count:0,
    dxsbAmount:0, dxsbCount:0,
    lyrs: [], glrs: [],
    scrapingAmount: 0, scrapingCount: 0
  };
  if(!state.total) return Object.assign({}, total, {loading: true});

  return Object.assign({}, state.total, {loading: false});
}
export default connect(mapStateToProps)(Index);
