import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import './Table.css';

export default function Table({students}) {
  const [state, setState] = useState({
    columns: [
      {
        title: "",
        render: (rowData) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedState[`checked-${rowData.fullName}`]}
                onChange={handleCheckChange}
                name={`checked-${rowData.fullName}`}
                color="primary"
              />
            }
          />
        ),
        cellStyle: {
          textAlign: "center",
        },
      },
      {
        title: "Code",
        field: "classCode",
      },
      { title: "Name", field: "fullName" },
      {
        title: "Email",
        field: "email",
        render: (rowData) => (
          <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
        ),
      },
      {
        title: "GH",
        field: "githubId",
        render: (rowData) => (
          <a
            href={`https://github.com/${rowData.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {rowData.githubId}
          </a>
        ),
      },
      {
        title: "Grad Date",
        field: "graduationDate",
      },
      {
        title: "Sessions",
        field: "sessionsWeek",
      },
      {
        title: "Diff",
        field: "timeDiff",
      },
      {
        title: "Zoom",
        field: "zoomLink",
        render: (rowData) => (
          <a href={rowData.zoomLink} target="_blank" rel="noopener noreferrer">
            {rowData.zoomLink}
          </a>
        ),
      },
      {
        title: "Spot",
        field: "startingPoint",
      },
    ],
    data: [],
  });
  const [checkedState, setCheckedState] = React.useState({});
  const [isSendAvail, setIsSendAvail] = React.useState(false);

  useEffect(() => {
    setState(prevState=>{
        return { ...prevState, data: students };
    });
  }, [students]);

  useEffect(()=>{
    let checkedArray = Object.entries(checkedState).map((keyValArr) =>
      keyValArr[1]).filter((checkedVal) => checkedVal);
      checkedArray.length > 0 ? setIsSendAvail(true) : setIsSendAvail(false);
  },[checkedState]);

  const handleCheckChange = (event) => {
    setCheckedState(prevState=>{
      return {
        ...prevState, 
        [event.target.name]: event.target.checked 
      }
    });
  };

  const addStudent = (studentObj) => {
    const splitDate = studentObj.graduationDate.split('/');
    return fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...studentObj,
        graduationDate: [
          parseInt(splitDate[2]),
          parseInt(splitDate[0]),
          parseInt(splitDate[1]),
        ],
      }),
    });
  }
  
  return (
    <>
      <MaterialTable
        title=""
        columns={state.columns}
        data={state.data}
        options={{
          tableLayout: "auto",
          sorting: true,
          rowStyle: {
            backgroundColor: "#EEE",
          },
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        components={{}}
        actions={[
          {
            icon: () => <SendOutlinedIcon />,
            tooltip: "Send all emails",
            isFreeAction: true,
            disabled: isSendAvail ? false : true,
            onClick: (event) => alert("Sending all emails"),
          }
        ]}
        editable={{
          onRowAdd: async (newData) => {
            try {
              const response = await addStudent(newData);
            } catch (err) {
              return;
            }
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            });
          },
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </>
  );
}

// const promiseHandler = useMemo((newData, oldData) => 
// new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//       setState(prevState => {
//         const data = [...prevState.data];
//         data.push(newData);
//         return { ...prevState, data };
//       });
//     }, 600);
//   }),
// )
