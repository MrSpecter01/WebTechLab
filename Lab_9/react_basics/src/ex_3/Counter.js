import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  // 1. Initialize state: 'count' is the value, 'setCount' is the function to update it
  // We start the counter at 0
  const [count, setCount] = useState(0);

  // 2. Functions to handle clicks
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h2>Interactive Counter</h2>
      
      {/* 3. Display the current count dynamically */}
      <div className="count-display">{count}</div>

      <div className="button-group">
        {/* 4. Use onClick to trigger our functions */}
        <button className="btn-decrement" onClick={decrement}>- Decrease</button>
        <button className="btn-increment" onClick={increment}>+ Increase</button>
      </div>
      
      <button className="btn-reset" onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

export default Counter;