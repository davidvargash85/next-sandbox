"use client";

import React, { Component } from "react";

interface CounterProps {
  message?: string;
}

interface CounterState {
  count: number;
}

export class Numbers extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }

  render() {
    return (
      <div className="flex flex-row justify-center">
        <div>
          <div className="flex flex-col ">
            <h3 className="text-2xl">Count:</h3>
            <h1 className="text-xl">{this.state.count}</h1>
          </div>
          <div className="flex flex-row gap-5 mt-4">
            <button
              className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
              onClick={this.decrement}
            >
              -
            </button>
            <button
              className="w-10 h-10 rounded-lg bg-slate-500 text-lg"
              onClick={this.increment}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}
