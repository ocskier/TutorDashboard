import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

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
      },
      {
        title: 'GH',
        field: 'githubId',
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
        field: 'zoomLink'
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
  
  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      options={{ sorting: true }}
      editable={{
        onRowAdd: (newData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
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
