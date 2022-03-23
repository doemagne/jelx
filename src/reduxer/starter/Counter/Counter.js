//import { counterActions } from '../../store/index-redux';
import { increase, decrement, increment, toggle } from '../../../store/slice/CounterSlice';
import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
//import { useState } from 'react';
//import { Component } from 'react';
const Counter = () => {
  //const [ctoggle,setCtoggle] = useState(true);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);
  //const counter = useSelector((state) => state.counter);
  //const counter = useSelector(state => state.value);
  const toggleCounter = useSelector(state => state.counter.toggleCounter);
  const incrementHandler = () => {
    //dispatch({type: 'increment'});
    //dispatch(counterActions.increment());
    dispatch(increment());
    console.log(counter);
  };
  const increaseHandler = () => {
    //dispatch({type: 'increase', amount: 5});
    //dispatch(counterActions.increase(5));
    //dispatch(counterActions.increase({amount:5}));
    dispatch(increase({amount:5}));
  };
  const decrementHandler = () => {
    //dispatch({type: 'decrement'});
    //dispatch(counterActions.decrement());
    dispatch(decrement());
  };
  const toggleCounterHandler = () => {
    //dispatch({type: 'toggle'});
    //dispatch(counterActions.toggleCounter());
    dispatch(toggle());
    console.log(toggleCounter);
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {toggleCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increaseHandler}>increase</button>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

//class Counter extends Component {
//constructor() {}
//}

export default Counter;
