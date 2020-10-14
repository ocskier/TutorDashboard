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
    chartCtn: {
      padding: "2rem",
      border: "3px solid lightblue",
      width: "min-content",
      marginTop: "15rem"
    }
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

  useEffect(()=>{
    students.length > 0 && console.log(students);
  },[students])

  return (
    <div className="App">
      <Header />
      {!error ? (
        <div className='main'>
          <p className="pt-2 text-center text-success">
            {!time ? "Loading..." : `${time}`}
          </p>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: 'wrap' }}>
            <div>
              <Table students={students} />
            </div>
          </div>
        </div>
      ) : (
        <p className="pt-2 text-center text-error">{error}</p>
      )}
    </div>
  );
};

export default App;
