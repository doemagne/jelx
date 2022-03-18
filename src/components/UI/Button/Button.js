import React from 'react';

//import './Button.css';

const Button = props => {
  return (
    <button type={props.type} className="w-100 btn btn-lg btn-warning" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;