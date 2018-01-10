import React, { Component } from 'react';

import ItemDelivery from './ItemDelivery';
import ItemTable from './ItemTable';
import ItemPackage from './ItemPackage';

import dummy from '../dummy';

class OrderReception extends Component {
  render() {
    return (
      <div className="body">
        <div className="bodyHeader">2017-12-22</div>
        <ul className="list-items">
          {dummy.map((order, index) => {
            if (order.type === 'delivery') {
              return <ItemDelivery order={order} key={`order-${index}`} />;
            } else if (order.type === 'order') {
              return <ItemTable order={order} key={`order-${index}`} />;
            } else {
              return <ItemPackage order={order} key={`order-${index}`} />;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default OrderReception;
