import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import './Table.css';

export default function Table({students}) {
  const [state, setState] = useState({
    columns: [
    //   {
    //     title: '',
    //     field: 'pic',
    //     render: rowData => <img src={rowData.pic} style={{ width: 100, borderRadius: '50%' }} />,
    //     cellStyle: {
    //       textAlign: 'center',
    //     },
    //   },
      {
        title: 'Code',
        field: 'classCode' 
      },
      { title: 'Name', field: 'fullName' },
      {
        title: 'Email',
        field: 'email',
        render: rowData => <a href={`mailto:${rowData.email}`}>{rowData.email}</a>,
      },
      {
        title: 'GH',
        field: 'githubId',
        render: rowData => <a href={`https://github.com/${rowData.githubId}`} target="_blank">{rowData.githubId}</a>,
      },
      {
        title: 'Grad Date',
        field: 'graduationDate'
      },
      {
        title: 'Sessions',
        field: 'sessionsWeek'
      },
      {
        title: 'Diff',
        field: 'timeDiff'
      },
      {
        title: 'Zoom',
        field: 'zoomLink',
        render: rowData => <a href={rowData.zoomLink} target="_blank">{rowData.zoomLink}</a>,
      },
      {
        title: 'Spot',
        field: 'startingPoint'
      }
    ],
    data: [],
  });

  useEffect(() => {
    setState(prevState=>{
        return { ...prevState, data: students };
    });
  }, [students]);

  useEffect(()=>{
    students.length > 0 && console.log(students);
  },[students]);

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
        editable={{
          onRowAdd: async (newData) => {
            try {
                const response = await addStudent(newData)
            } catch (err) {
              return
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
        components={{}}
        actions={[
          {
            icon: () => <SendOutlinedIcon />,
            tooltip: "Send all emails",
            isFreeAction: true,
            disabled: true,
            onClick: (event) => alert("Sending all emails"),
          },
        ]}
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
