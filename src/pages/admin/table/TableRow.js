import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableCell from './TableCell';


const TableRow = (props) => {
  const celldata = props.celldata
  const headers = useSelector(state => state.table.headers)
  const [tableRow, setTableRow] = useState()
  const onClickHandler = (item) => {
    props.onClickHandler(item)
  }
  useEffect(() => {
    if (headers || headers.length > 0) {
      setTableRow(headers.map((header) => <TableCell key={header.headerCaption} caption={props.celldata[header.headerCaption]} />))
    }
  }, [headers, setTableRow, celldata])


  return (
    <Fragment>
      <tr onClick={onClickHandler}>
        {tableRow}
      </tr>
    </Fragment>
  )
};

export default TableRow;

/* <td>{props.id}</td>
        <td>{props.caption}</td>
        <td >{props.information}</td>
        <td>{props.suggestion}</td>
        <td>{props.page}</td>
        <td>{props.status}</td>
        <td>{props.user}</td> */