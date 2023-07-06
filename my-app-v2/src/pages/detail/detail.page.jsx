import React from 'react';
import CourseService from '../../services/course.service';
import { useParams } from 'react-router-dom';

import { useState, useEffect  } from "react";



  const DefaultPage= (props)  =>  {

 
    const { id } = useParams()
     

    const course= JSON.parse(localStorage.getItem('currentCourse'));

    const [students, setStudents] = useState("");

   

    useEffect(() => {
      findStudentsOfCourse();
     
      }
      
      ,[])



  


  const findStudentsOfCourse=()=> {
    
    CourseService.filterStudents(id).then(students => {
      setStudents(students.data);
      
    });
  }



  
 
    return (
      <div className="col-md-12">
        <div className="jumbotron">
          <h1 className="display-4">Course: {course.title}</h1>
          <h1 className="display-4">Course Id: {id}</h1>
        </div>
        {students.length &&
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Student Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) =>
                <tr key={student}>
                  <th scope="row">{index + 1}</th>
                  <td>{student}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    )
  }



export default DefaultPage
