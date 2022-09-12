import React from 'react';
import Test from './Test';

const TestParent = () => {
  const [test, setTest] = React.useState(5);
  function handleClick() {
    setTest((prevState) => (prevState += 1));
  }
  return (
    <div>
      <Test
        title={'title'}
        name={'urmom'}
        age={17}
        exist={false}
        test={test}
        x={handleClick}
      />
      <Test
        title={'title2'}
        name={'urmom2'}
        age={172}
        exist={false}
        test={test}
        x={handleClick}
      />
      <Test
        title={'title3'}
        name={'urmom3'}
        age={173}
        exist={false}
        test={test}
        x={handleClick}
      />
    </div>
  );
};

export default TestParent;
