import React , {useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './register.scss';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL

const Register = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await axios.post(`${BASE_URL}/sign-in`, formData);
  //   dispatch(setUser(response.data))
  //   console.log(response.data); 

  //   localStorage.setItem('user', JSON.stringify(response.data))
  //   navigate('/')
   
  // };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(`${BASE_URL}/sign-in`, values);
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.removeItem('persist:root')
      dispatch(setUser(response.data))
      navigate('/')

    } catch (error) {
      if (error.response) {
        setFieldError('apiError', error.response.data.message);
      } else {
        console.log('errorhai-->', error.message  )
        setFieldError('apiError', 'An error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };


   // if token found navigate to home page
   useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[])  

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form> */}

    <Formik
        initialValues={{ name: '', email: '', password: '', apiError: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </div>
            <ErrorMessage name="apiError" component="div" className="error-message" />
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default Register;
