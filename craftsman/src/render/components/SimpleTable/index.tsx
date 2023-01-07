import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function SimpleTable(props?: any) {
  const fetchFunction = (url: string, name: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const updatedState = { ...props.context.state };
        updatedState[name] = data;
        props.context.setState(updatedState);
      });
  };

  if (
    props.context.state[props.name] === undefined &&
    props.dataURL !== undefined
  ) {
    fetchFunction(props.dataURL, props.name);
  } else if (
    props.context.state[props.name] === undefined &&
    props.data !== undefined
  ) {
    const updatedState = { ...props.context.state };
    updatedState[props.name] = props.data;
    props.context.setState(updatedState);
  }

  const renderTable = (data: any[]) => {
    if (data === undefined) return <h1>No Table</h1>;
    if (data.length < 1) return <h1>No Table</h1>;

    let headerKeys: any[] = [];
    data.forEach((row) => {
      const rowKeys = Object.keys(row);
      const filteredRowKeys = rowKeys.filter(
        (rowKey) => !headerKeys.find((headerKey) => headerKey === rowKey)
      );
      headerKeys = headerKeys.concat(filteredRowKeys);
    });

    const renderRow = (row: any, index: number) => {
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          {headerKeys.map((headerKey) => (
            <td>{row[headerKey] !== undefined ? row[headerKey] : ""}</td>
          ))}
        </tr>
      );
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {headerKeys.map((headerKey) => (
              <th scope="col">{headerKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((row, index) => renderRow(row, index))}</tbody>
      </table>
    );
  };

  return <>{renderTable(props.context.state[props.name])}</>;
}
