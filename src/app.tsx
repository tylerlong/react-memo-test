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

const Child = memo(() => {
  console.log('Child renders');
  return <h2>Child</h2>;
});

export default App;
