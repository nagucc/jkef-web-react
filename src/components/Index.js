'use strict';
import React from 'react';
import accounting from 'accounting';
import * as actions from '../redux/actions';

class Index extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchTotalStat());
	}

  render() {
    return (
      <div className="cell">
        <div className="hd">
          <h1 className="page_title">概览</h1>
        </div>
        <div className="bd">
          <div className="weui_cells_title">全部资产</div>
          <div className="weui_cells weui_cells_access">
            <a className="weui_cell" href="/items">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  原值
                </p>
              </div>
              <div className="weui_cell_ft">{accounting.formatMoney(this.props.amount, '¥')}元</div>
            </a>
            <a className="weui_cell" href="/items">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  数量
                </p>
              </div>
              <div className="weui_cell_ft">{accounting.formatNumber(this.props.count)}项</div>
            </a>
          </div>

          <div className="weui_cells_title">大型设备</div>
          <div className="weui_cells weui_cells_access">
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  原值
                </p>
              </div>
              <div className="weui_cell_ft">说明文字</div>
            </a>
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  数量
                </p>
              </div>
              <div className="weui_cell_ft">{accounting.formatNumber(this.props.dxsbCount)}项</div>
            </a>
          </div>

          <div className="weui_cells_title">待报废资产</div>
          <div className="weui_cells weui_cells_access">
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  原值
                </p>
              </div>
              <div className="weui_cell_ft">说明文字</div>
            </a>
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  数量
                </p>
              </div>
              <div className="weui_cell_ft">{accounting.formatNumber(this.props.scrapingCount)}项</div>
            </a>
          </div>

          <div className="weui_cells_title">管理人及领用人</div>
          <div className="weui_cells weui_cells_access">
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  管理人
                </p>
              </div>
              <div className="weui_cell_ft">{this.props.glrs.length}名</div>
            </a>
            <a className="weui_cell" href="javascript:;">
              <div className="weui_cell_bd weui_cell_primary">
                <p>
                  领用人
                </p>
              </div>
              <div className="weui_cell_ft">{this.props.lyrs.length}名</div>
            </a>
          </div>
        </div>
      </div>

    );
  }

}

export default Index;
