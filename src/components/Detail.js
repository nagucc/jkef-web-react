import React, { PropTypes } from 'react'

class Detail extends React.Component {
  render () {
    return (
      <div className="cell">
        <div className="hd">
          <h1 className="page_title">{this.props.title}</h1>
        </div>
        <div className="bd">
          <div className="weui_cells_title">{this.props['设备名称']}</div>
          <div className="weui_cells">
            {
              this.props.items.map((item, i) => {
                return (
                  <div className="weui_cell" key={i}>
                    <div className="weui_cell_bd weui_cell_primary">
                      <p>{item.name}</p>
                    </div>
                    <div className="weui_cell_ft">{item.value}</div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    )


  }
}

export default Detail;
