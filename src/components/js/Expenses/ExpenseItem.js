import React from 'react';

import ExpenseDate from './ExpenseDate';
import CardJ from '../UI/CardJ';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  return (
    <li>
      <CardJ className='expense-item'>
        <div className='expense-item__description'>
        <ExpenseDate date={props.date} />
          <h2>{props.title}</h2>
          <div className='expense-item__price'>${props.amount}</div>
        </div>
      </CardJ>
    </li>
  );
};

export default ExpenseItem;
