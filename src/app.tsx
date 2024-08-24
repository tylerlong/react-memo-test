import React from 'react';

const App = () => {
  console.log('App renders');
  return <Child />;
};

const Child = () => {
  console.log('Child renders');
  return <div>Child</div>;
};

export default App;
