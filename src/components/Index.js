'use strict';
import React from 'react';
import accounting from 'accounting';
import * as actions from '../redux/actions';
import {Toast, CellsTitle, CellBody,Cell, CellFooter, Cells} from 'react-weui';

class Index extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchTotalStat());
	}

  render() {
    let {amount, count, dxsbAmount, dxsbCount, scrapingAmount, scrapingCount, lyrs, glrs} = this.props;
    return (
      <div className="cell">
        <div className="hd">
          <h1 className="page_title">概览</h1>
        </div>
        <div className="bd">
          <CellsTitle>全部资产</CellsTitle>

          <Cells access>
            <Cell href="/items">
              <CellBody>原值</CellBody>
              <CellFooter>{accounting.formatMoney(amount, '¥')}元</CellFooter>
            </Cell>
            <Cell href="/items">
              <CellBody>数量</CellBody>
              <CellFooter>{accounting.formatNumber(count)}项</CellFooter>
            </Cell>
          </Cells>

          <CellsTitle>大型设备</CellsTitle>
          <Cells access>
            <Cell href="/items?onlyDxsb=true">
              <CellBody>原值</CellBody>
              <CellFooter>{accounting.formatMoney(dxsbAmount, '¥')}元</CellFooter>
            </Cell>
            <Cell>
              <CellBody>数量</CellBody>
              <CellFooter>{accounting.formatNumber(dxsbCount)}项</CellFooter>
            </Cell>
          </Cells>

          <CellsTitle>待报废资产</CellsTitle>
          <Cells access>
            <Cell href="/items?onlyScraping=true">
              <CellBody>原值</CellBody>
              <CellFooter>{accounting.formatMoney(scrapingAmount, '¥')}元</CellFooter>
            </Cell>
            <Cell>
              <CellBody>数量</CellBody>
              <CellFooter>{accounting.formatNumber(scrapingCount)}项</CellFooter>
            </Cell>
          </Cells>

          <CellsTitle>管理人及领用人</CellsTitle>
          <Cells access>
            <Cell href="javascript:;">
              <CellBody>管理人</CellBody>
              <CellFooter>{glrs.length}名</CellFooter>
            </Cell>
            <Cell href="/stat/ByLyr">
              <CellBody>领用人</CellBody>
              <CellFooter>{lyrs.length}名</CellFooter>
            </Cell>
          </Cells>
        </div>
        <Toast show={this.props.loading} icon="loading">
                数据加载中...
        </Toast>
      </div>

    );
  }

}

export default Index;
