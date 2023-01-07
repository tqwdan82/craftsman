import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Table_MC_Editable = (props?: any) => {
  //fetch function
  const fetchFunction = (url: string, name: string) => {
    const controller = new AbortController();
    const fetchTimeoutId = setTimeout(() => controller.abort(), 10000);

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedState = { ...props.context.state };
        let index = 0;
        const dataWithStatus = data.map((res: any) => {
          return { ...res, state: "read", index: `${index++}` };
        });
        updatedState[name] = dataWithStatus;
        updatedState[`${name}_btn_disabled`] = false;
        props.context.setState(updatedState);

        clearTimeout(fetchTimeoutId);
      })
      .catch((err) => {
        const updatedState = { ...props.context.state };
        updatedState[name] = [];
        props.context.setState(updatedState);
      });
  };

  // update function
  const updateFunction = (url: string, data: any) => {
    const postUpdateFunction = (hasError: boolean) => {
      const updatedState = { ...props.context.state };
      updatedState[`${props.name}_btn_disabled`] = false;

      if (hasError) {
        updatedState[`${props.name}_failure_toast_hide`] = false;
        setTimeout(() => {
          const updatedState = { ...props.context.state };
          updatedState[`${props.name}_failure_toast_hide`] = true;
          props.context.setState(updatedState);
        }, 5000);
      }
      props.context.setState(updatedState);

      if (!hasError) {
        fetchFunction(
          `${props.res_domain}/web/services/resource/${props.res_model}`,
          props.name
        );
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then((res) => {
        postUpdateFunction(false);
        clearTimeout(timeoutId);
      })
      .catch((err) => {
        postUpdateFunction(true);
      });
  };

  // Save button handler function
  const saveBtnFunction = (name: string) => {
    const updatedState = { ...props.context.state };
    const dataToUpdate = updatedState[name];
    const dataToModify = dataToUpdate.filter(
      (data: { state: string }) => data.state === "edited"
    );
    const dataToPost = dataToModify.map((data: any) => {
      let modData = { ...data };
      delete modData.state;
      delete modData.index;
      return modData;
    });
    updateFunction(
      `${props.res_domain}/web/services/resource/${props.res_model}`,
      dataToPost
    );

    updatedState[`${name}_btn_disabled`] = true;
    props.context.setState(updatedState);
  };

  //call fetch function on load
  if (props.context.state[props.name] === undefined) {
    fetchFunction(
      `${props.res_domain}/web/services/resource/${props.res_model}`,
      props.name
    );
  }

  //render table function
  const renderTable = (data: any[]) => {
    if (data === undefined) return <h1>No Table</h1>;
    if (data.length < 1) return <h1>No Table</h1>;

    let headerKeys: any[] = [];
    data.forEach((row) => {
      const rowKeys = Object.keys(row);
      //prevent duplicates
      const filteredRowKeys = rowKeys.filter(
        (rowKey) =>
          rowKey !== "state" &&
          rowKey !== "index" &&
          !headerKeys.find((headerKey) => headerKey === rowKey)
      );
      headerKeys = headerKeys.concat(filteredRowKeys);
    });

    const renderRow = (row: any, index: number) => {
      return (
        <tr
          className={
            row["state"] !== undefined
              ? row["state"] == "edited"
                ? "table-warning"
                : undefined
              : undefined
          }
        >
          <th scope="row">{index + 1}</th>
          {headerKeys.map((headerKey) => {
            const noneEditables = props.none_editables.split(",");

            const foundNonEditableHeader =
              noneEditables.find((ne: any) => ne == headerKey) == undefined;

            if (!foundNonEditableHeader) {
              return (
                <td>{row[headerKey] !== undefined ? row[headerKey] : ""}</td>
              );
            } else {
              return (
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder={headerKey}
                    aria-label={headerKey}
                    value={row[headerKey] !== undefined ? row[headerKey] : ""}
                    onChange={(event) => {
                      const updatedState = { ...props.context.state };

                      const dataRetrieved = updatedState[props.name];
                      const updatedDataRetrieved = [...dataRetrieved];
                      const updateRowIndex = dataRetrieved.findIndex(
                        (data: { index: any }) => data.index === row.index
                      );
                      let updateRow = { ...dataRetrieved[updateRowIndex] };
                      updateRow.state = "edited";
                      updateRow[headerKey] = event.target.value;
                      updatedDataRetrieved.splice(updateRowIndex, 1, updateRow);

                      updatedState[props.name] = updatedDataRetrieved;
                      props.context.setState(updatedState);
                    }}
                  />
                </td>
              );
            }
          })}
        </tr>
      );
    };

    return (
      <>
        <div className="table-responsive">
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
        </div>
        <div className="container-fluid mb-3">
          <div className="row justify-content-end">
            <div className="col-4 d-grid">
              <button
                type="button"
                className="btn btn-primary"
                disabled={props.context.state[`${props.name}_btn_disabled`]}
                onClick={() => {
                  saveBtnFunction(props.name);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Failure toast for update */}
        <div className="position-fixed top-0 end-0" style={{ zIndex: "11" }}>
          <div
            className={`toast align-items-center text-white bg-danger border-0 ${
              props.context.state[`${props.name}_failure_toast_hide`] ===
              undefined
                ? "fade hide"
                : props.context.state[`${props.name}_failure_toast_hide`] ==
                  true
                ? "fade hide"
                : "fade show"
            }`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">Error! Update(s) not saved.</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{renderTable(props.context.state[props.name])}</>;
};
