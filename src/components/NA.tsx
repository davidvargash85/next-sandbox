"use client";

import React, { useState }  from 'react';
type CounterState = {
    count: number;
  }

export const Numbers = ()=>{
    const initialCounter:CounterState = {
        count: 0
    }
    
    const [counter, setCount] = useState<CounterState>(initialCounter);
    const decrement = () => {
      setCount((prevState) => ({ count: prevState.count - 1 }));
    };

    const increment = () => {
      setCount((prevState) => ({ count: prevState.count + 1 }));
    };

    return(<>
        <div className="flex flex-row justify-center">
        <div>
          <div className="flex flex-col ">
            <h3 className="text-2xl">Count:</h3>
            <h1 className="text-xl">{counter.count}</h1>
          </div>
          <div className="flex flex-row gap-5 mt-4">
            <button
              className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
              onClick={decrement}
            >
              -
            </button>
            <button
              className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>)
}