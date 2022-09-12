import React from 'react';

const Test = (props) => {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.name}</div>
      <div>{props.age}</div>
      <div>{props.exist}</div>
      <div onClick={props.x}> test: {props.test}</div>
      <div>Hi</div>
    </div>
  );
};

export default Test;
