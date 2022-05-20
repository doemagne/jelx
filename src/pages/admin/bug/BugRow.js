import { Fragment } from 'react';

const BugRow = (props) => {

  return (
    <Fragment>
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.caption}</td>
        <td >{props.information}</td>
        <td>{props.suggestion}</td>
        <td>{props.page}</td>
        <td>{props.status}</td>
        <td>{props.user}</td>
        {/* <td>{props.created}</td> */}

      </tr>
    </Fragment>
  )
};

export default BugRow;