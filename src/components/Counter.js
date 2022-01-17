import React from 'react';
import { useStateValue } from './StateProvider';
import './Counter.css';

function Counter({ item }) {
    // eslint-disable-next-line no-empty-pattern
    const [{ }, dispatch] = useStateValue();

    const handleDecrement = () => {
        dispatch({
            type: "DECREMENT_COUNTER",
            item: item
        })
    }

    const handleIncrement = () => {
        dispatch({
            type: "INCREMENT_COUNTER",
            item: item
        })
    }

    const setIconColor = () => {
        debugger
        return (
            item.options[item.selectedIndex].quantity === 0 ? "counter__disable" : "counter__increment"
        )
    }

    return (
        <div className="counter">
            <button type="button" 
            onClick={handleDecrement} 
            disabled={item.quantity > 0 ? "false" : "true"}
            className='counter__decrement'> - </button>
            <span className="counter_number">{item.quantity}</span>
            <button type="button"
                disabled={item.options[item.selectedIndex].quantity === 0 ? true : false}
                onClick={handleIncrement} className="counter__increment"> + </button>
        </div>
    )
}

export default Counter
