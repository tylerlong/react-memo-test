import React, { useCallback } from 'react';
import { Button } from 'antd';
import { auto } from 'manate/react';

import type { Store } from './store';

const App = auto((props: { store: Store }) => {
  console.log('App renders');
  const { store } = props;
  const f = useCallback(() => {
    store.count += 1;
  }, []);
  return (
    <>
      <h2>{store.count}</h2>
      <Child f={f} />
    </>
  );
});

const Child = auto((props: { f: () => void }) => {
  console.log('Child renders');
  return (
    <>
      <h2>Child</h2>
      <Button onClick={() => props.f()}>Click me</Button>
    </>
  );
});

export default App;
