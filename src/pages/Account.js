import React from 'react';
const Account = (props) => {
    return (
      <div>
        Account {props.name ? props.name : "You're not authenticated."}
      </div>
    );
}


export default Account;