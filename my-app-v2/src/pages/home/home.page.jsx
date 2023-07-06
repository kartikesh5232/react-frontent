import React from 'react';
import UserService from '../../services/user.service';
import CourseService from '../../services/course.service';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import { useState, useEffect  } from "react";

const  HomePage =(props)=> {






  const [courses, setCourses] = useState("")
  const [errorMessage, setError] = useState("")
  const [infoMessage, setInfo] = useState("")
  const [currentUser, setUser] = useState("")


  useEffect(() => {
    UserService.currentUser.subscribe(data => {
      setUser(data)
    });

  getAllCourses();

    },[])
  


  const getAllCourses=()=>
  {

    setCourses({loading: true});

    CourseService.findAllCourses().then(req => {
      setCourses(req.data);

    });

    
  }




  const enroll=(course)=> {

    if(!currentUser){
      setError('To enroll a course, you should sign in.');
      return;
    }

    var transaction = new Transaction(currentUser.id, course);
    CourseService.createTransaction(transaction).then(data => {
      setInfo( 'You enrolled the course successfully.');
    }, error => {
      setError( 'Unexpected error occurred.');
    });
  }






 const detail=(course)=> {
    localStorage.setItem('currentCourse', JSON.stringify(course));
    props.history('/detail/' + course.id)
  
  }




  

    return (

      <div className="col-md-12">
        {infoMessage &&
          <div className="alert alert-success">
            <strong>Successfull! </strong>{infoMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }

        {errorMessage &&
          <div className="alert alert-danger">
            <strong>Error! </strong>{errorMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }

        {courses.loading && <em> Loading courses...</em>}

        {courses.length &&
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Title</th>
                <th scope="col">Author</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) =>
                <tr key={course.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{course.title}</td>
                  <td>{course.author}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => detail(course)}>Detail</button>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => enroll(course)}>Enroll</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    );
  

}

export default HomePage