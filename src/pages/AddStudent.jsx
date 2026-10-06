import React, { useEffect, useState } from 'react'
import './addstudent.css'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';


const AddStudent = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    city: "",
    address: "",
    enrollmentDate: "",
    status: ""
  });

  const [startDate, setStartDate] = useState(new Date());


  const [courses, setCourses] = useState([])

  const getCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      
      setCourses(response.data)
      console.log(response.data);

    }
    catch(error) {
      console.log('there is something wrong !!!', error);

    }
  }

  useEffect(() => {
    getCourses()
  }, [])

const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/students', values)
        .then((response) =>
          //setValues(response.data)
          console.log(response.data)

          

        ).catch((error) => {
          console.log(error);

        })

        navigate("/students")
        alert("Student added successfully")

    }
    catch {
      console.log('There is some wrong!!!');

    }

  }

  return (
    <>
      <div className='container formPage'>

        <div className='pageHeader'>
          <div className='leftSection'>
            <h1>Add New Student</h1>
            <p>Fill in the details to add student.</p>
          </div>
        </div>

        <div className='pageBody'>

          <form className='formContainer' onSubmit={handleSubmit}>

            <div className='formField'>
              <label>Full Name*</label>
              <input type="text" name="name" onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
                value={values.name}
              required />
            </div>

            <div className='formField'>
              <label>Email*</label>
              <input type="email" name='email' onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              } value={values.email} required />
            </div>

            <div className='formField'>
              <label>Phone*</label>
              <input type="number" name='phone' onChange={(e) =>
                setValues({ ...values, phone: e.target.value })
              } value={values.phone} required />
            </div>

            <div className='formField'>
              <label>Age*</label>
              <input type="number" name='age' onChange={(e) =>
                setValues({ ...values, age: e.target.value })
              } value={values.age} required />
            </div>

            <div className='formField'>
              <label>Gender*</label>
              <select onChange={(e) =>
                setValues({ ...values, gender: e.target.value })
              } required value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className='formField'>
              <label>Course*</label>
              <select name='course' onChange={(e) =>
                setValues({ ...values, course: e.target.value })
              } required value={values.course}>
                <option value="">Select Course</option>
                {
                  courses.map((item) => (
                    <option>{item.course}</option>
                  ))
                }
              </select>
            </div>

            <div className='formField'>
              <label>City*</label>
              <input type="text" name='city' onChange={(e)=>
                setValues({...values, city: e.target.value})
              } required />
            </div>

            <div className='formField'>
              <label>Address*</label>
              <input type="text" name='address' onChange={(e)=>
                setValues({...values, address: e.target.value})
              } required/>
            </div>

            <div className='formField'>
              <label>Enrolment Date*</label>
              <DatePicker
                selected={values.enrollmentDate ? new Date(values.enrollmentDate) : null}
                onChange={(date) => {
                  setValues({
                    ...values,
                    enrollmentDate: date
                      ? date.toISOString().split("T")[0]
                      : ""
                  });
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select enrolment date"
                required
              />
            </div>

            <div className='formField'>
              <label>Status*</label>
              <select name='status' onChange={(e)=>
                setValues({...values, status:e.target.value})
              } required value={values.status}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className='formField'>
              <button>Add Student</button>
            </div>
          </form>

        </div>

      </div>

    </>
  )
}

export default AddStudent