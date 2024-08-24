import React, { memo } from 'react';
import { Button } from 'antd';

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

const _Child = () => {
  console.log('Child renders');
  return <h2>Child</h2>;
};

const Child = memo(() => null);
Child.type = _Child;

export default App;
