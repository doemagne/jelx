//import { createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialStateI = {
    //counterState: {
        counter: 0,
        counterToggle: true,
    //},
    //authState: {
        username: '',
        password: ''
    //}
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialStateI,
    reducers: {
        increment:(state) => {
            console.log(state);
            state.counter++;
        },
        decrement:(state) => {
            console.log(state);
            state.counter--;
        },
        increase:(state,action) => {
            console.log(state);
            //state.counter += action.amount
            //state.counter += action.payload.amount
            state.counter += action.payload.amount;
        },
        toggleCounter: (state) => {
            console.log(state);
            state.counterToggle = !state.counterToggle;
        },
    }
});

/*
const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            counterToggle: state.counterToggle
        };
    }
    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            counterToggle: state.counterToggle
        };
    }
    if (action.type === 'increase') {
        return (
            {
                counter: state.counter + action.amount,
                counterToggle: state.counterToggle
            }
        );
    }
    if (action.type === 'toggle') {
        return ({
            counter: state.counter,
            counterToggle: !state.counterToggle,
        });
    }
    return state;
};
*/
export const counterActions = counterSlice.actions;

//const store = createStore(counterReducer);
///const store = createStore(counterSlice.reducer);
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        //anotherreducer: anotherSlice.reducer
    }
});

export default store;

/*
/*
//const counterReducer = (state = {counter:0}, action) => {
*/
//console.log(store.getState());

/*const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};*/

//store.subscribe(counterSubscriber);
//store.dispatch({type:'increment'});
//store.dispatch({type:'increment'});
//store.dispatch({type:'decrement'});