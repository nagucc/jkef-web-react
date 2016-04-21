import React, { PropTypes } from 'react'
import {CellsTitle, Cells, Cell, CellBody, CellFooter} from 'react-weui';

class Detail extends React.Component {
  render () {
    let {title, items} = this.props;
    return (
      <div className="cell">
        <div className="hd">
          <h1 className="page_title">{title}</h1>
        </div>
        <div className="bd">
          <CellsTitle>{this.props['设备名称']}</CellsTitle>
          <Cells>
            {
              items.map((item, i) => {
                return (
                  <Cell key={i}>
                    <CellBody>{item.name}</CellBody>
                    <CellFooter>{item.value}</CellFooter>
                  </Cell>
                );
              })
            }
          </Cells>
        </div>
      </div>
    )


  }
}

export default Detail;
