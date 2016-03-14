import { connect } from 'react-redux'
import Index from '../../components/Gdzc/Index';

const mapStateToProps = (state, ownProps) => {
  let total = {
    amount:0, count:0,
    dxsbAmount:0, dxsbCount:0,
    lyrs: [], glrs: [],
    scrapingAmount: 0, scrapingCount: 0
  };
  if(!state.total) return total;

  return state.total;
}
export default connect(mapStateToProps)(Index);
