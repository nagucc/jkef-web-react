import { connect } from 'react-redux'
import List from '../components/List';

const mapStateToProps = (state, ownProps) => {

  let title = '固定资产'
  if(state.itemsFilter){
    if(state.itemsFilter.onlyDxsb){
      title = '大型设备';
    } else if(state.itemsFilter.onlyScraping){
      title = '待报废资产';
    }
  }

  let result = {
    filter: state.itemsFilter,
    items: state.items,
    title: (state.itemsFilter && state.itemsFilter.year)
            ? `${title}[${state.itemsFilter.year}]`
            : title,
    showToast: state.loadingStatus === 'loading'
  };
  return result;
};

export default connect(mapStateToProps)(List);
