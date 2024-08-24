import React, { memo, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { manage, run, disposeSymbol } from 'manate';
import type { ManateEvent } from 'manate/models';

const App = () => {
  const [count, setCount] = React.useState(0);
  console.log('App renders');
  return (
    <>
      <h2>{count}</h2>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <Child />
    </>
  );
};

const auto = (Component: React.FC) => {
  const temp = (props) => {
    const render = () => Component(props);
    const prev = useRef<() => void>();
    prev.current?.();
    const dispose = () => {
      managed?.[disposeSymbol]();
      managed = undefined;
    };
    prev.current = dispose;
    useEffect(() => {
      if (!managed) {
        // strict mode re-mount
        managed = manage(props);
        managed.$e.on(listener);
      }
      return dispose;
    }, []);
    let managed = manage(props);
    const [result, isTrigger] = run(managed, render);
    const [, refresh] = useState(0);
    const listener = (event: ManateEvent) => {
      if (isTrigger(event)) {
        refresh((i) => i + 1);
      }
    };
    managed.$e.on(listener);
    return result;
  };
  return memo(temp);
};

const Child = auto(() => {
  console.log('Child renders');
  return <h2>Child</h2>;
});

export default App;
