import { Fragment, useEffect, useState } from 'react';

const TableCell = (props) => {

  return (
    <Fragment>
      <td>{props.caption}</td>
    </Fragment>
  )
};

export default TableCell;