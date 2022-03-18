import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropDownBar = (props) => {
  const [error, setError] = useState({
    title: '',
    content: '',
  });
  try {

  } catch (e) {
    //let result = (e as Error).message;
    if (e instanceof Error) {
      //result = (e as Error).message; // works, `e` narrowed to Error
      setError({
        title: "An error occured.",
        content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
      });
      console.log(error);

    }
  }

  return (
    <div>
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="/" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false"></Link>
        <ul className="dropdown-menu" aria-labelledby="dropdown01">
          <li className="nav-item">
            <Link to="/account/signin" className="nav-link active" aria-current="page">Sign In</Link>
          </li>
        </ul>
      </li>
    </div>
  );
};

export default DropDownBar;