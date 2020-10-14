import React, { useState, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';

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
        field: 'class-code' 
      },
      { title: 'Name', field: 'Full Name' },
      {
        title: 'Email',
        field: 'Email',
      },
      {
        title: 'GH',
        field: 'Github Id',
      },
      {
        title: 'Grad Date',
        field: 'Graduation Date'
      },
      {
        title: 'Sessions',
        field: 'Sessions/Week'
      },
      {
        title: 'Diff',
        field: 'Time Difference'
      },
      {
        title: 'Zoom',
        field: 'Zoom Link'
      },
      {
        title: 'Spot',
        field: 'Starting Point'
      }
    ],
    data: [],
  });

  useEffect(() => {
    console.log(students);
    setState(prevState=>{
        return { ...prevState, data: students };
    });
  }, [students]);

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
