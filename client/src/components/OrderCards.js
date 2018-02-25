import React from 'react';
import OrderCard from './OrderCard';

const OrderCards = ({ orders }) => (
  <div className="Cards">
    {
      orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))
    }
  </div>
)

export default OrderCards;
