"use client";

import React, { useState } from "react";

interface CounterProps {
  message?: string;
}

interface CounterState {
  count: number;
}

const Counter: React.FC<CounterProps> = ({
  message = ''
}) => {
  const [counter, setCounter] = useState<CounterState>({ 
    count: 0
  });

  return (
    <div className="flex flex-row justify-center">
      <div>
        <div className="flex flex-col ">
          <h3 className="text-2xl">Count:</h3>
          <h1 className="text-xl">{counter.count}</h1>
          <p>{message}</p>
        </div>
        <div className="flex flex-row gap-5 mt-4">
          <button
            className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
            onClick={() => setCounter({ ...counter, count: counter.count - 1})}
          >
            -
          </button>
          <button
            className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
            onClick={() => setCounter({ ...counter, count: counter.count + 1})}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
