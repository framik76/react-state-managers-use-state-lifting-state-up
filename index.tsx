import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import "./style.css";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [random, setRandom] = useState<number>(0);
  console.log("------\nApp: render");

  const inc = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const dec = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return (
    <div className="comp">
      <h3>Demo Hooks: useState</h3>
      <button onClick={dec}>-</button>
      <button onClick={inc}>+</button>
      <button onClick={() => setRandom(Math.random())}>Random</button>
      <Dashboard count={count} random={random} increment={inc} />
    </div>
  );
}

interface DashboardProps {
  count: number;
  random: number;
  increment: () => void;
}

const Dashboard: React.FC<DashboardProps> = props => {
  console.log(" Dashboard: render");
  return (
    <div className="comp">
      Dashboard
      <CounterPanel value={props.count} />
      <RandomPanel value={props.random} />
      <Buttons increment={props.increment} />
    </div>
  );
};

const CounterPanel: React.FC<{ value: number }> = React.memo(props => {
  console.log("  CounterPanel: render");
  return <div className="comp">CounterPanel: {props.value}</div>;
});

const RandomPanel: React.FC<{ value: number }> = React.memo(props => {
  console.log("  Random Panel: render");
  return <div className="comp">RandomPanel: {props.value}</div>;
});

const Buttons: React.FC<{ increment: () => void }> = React.memo(props => {
  console.log("  Buttons: render");
  return (
    <div className="comp">
      <button onClick={props.increment}>Update Counter</button>
    </div>
  );
});

render(<App />, document.getElementById("root"));
