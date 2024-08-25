import type { FunctionComponent } from 'react';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { manage, run, disposeSymbol } from 'manate';
import type { Managed, ManateEvent } from 'manate/models';

import type { Store } from './store';

const auto = <P extends object>(Component: FunctionComponent<P>) => {
  const temp = (props: P) => {
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
    let managed: Managed<P> | undefined = manage(props);
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

const App = auto((props: { store: Store }) => {
  console.log('App renders');
  const [counter, setCounter] = useState(0);
  const { store } = props;
  return (
    <>
      <h2>{store.count}</h2>
      {counter}
      <Button
        onClick={() => {
          store.count += 1;
        }}
      >
        Click me
      </Button>
      <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
      <Child />
    </>
  );
});

const Child = auto(() => {
  console.log('Child renders');
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h2>Child</h2>
      {counter}
      <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
    </>
  );
});

export default App;
