import React, { useEffect, useState } from "react";
import clsx from 'clsx';

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Header from "./Components/Header";
import Table from "./Components/Table";

import './App.css';

const useStyles = makeStyles((theme) =>
  createStyles({
    hide: {
      visibility: "hidden",
    },
    show: {
      visibility: "visible",
    },
    tableWrapper: {
      width: "100%",
    },
  })
);

export const App = () => {
  const [students, setStudents] = useState([]);
  const [time, setTime] = useState(null);
  const [error, setError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await fetch("/current-time");
        if (response.ok) {
          const data = await response.json();
          const date = new Date();
          date.setTime(data.time * 1000);
          date.toLocaleString();
          const studentsResRaw = await fetch("/api/students");
          const studentsData = await studentsResRaw.json();
          setTime(date);
          setStudents(studentsData);
        } else {
          setError(response.statusText);
        }
      } catch (err) {
        console.log(err)
        setError(true);
      }
    }
    fetchAllData();
  }, []);
  
  return (
    <div className="App">
      <Header />
      {!error ? (
        <div className='main'>
          <p className="pt-2 text-center text-success">
            {!time ? "Loading..." : `${time}`}
          </p>
          <div className={classes.tableWrapper}>
            <Table students={students.map(student =>{
              const numDate = new Date(student.graduationDate.$date);
              return { 
                ...student, 
                _id: student._id.$oid, 
                graduationDate: `${numDate.getMonth()+1}/${numDate.getDate()}/${numDate.getFullYear()}`
              }
            })} />
          </div>
        </div>
      ) : (
        <p className="pt-2 text-center text-error">{error}</p>
      )}
    </div>
  );
};

export default App;
