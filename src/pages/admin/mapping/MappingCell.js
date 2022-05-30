import { Fragment, useEffect, useState } from 'react';

const MappingCell = (props) => {

  return (
    <Fragment>
      <td>{props.caption}</td>
    </Fragment>
  )
};

export default MappingCell;