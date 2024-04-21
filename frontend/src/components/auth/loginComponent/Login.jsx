import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { clearTimer } from '../../../redux/reducers/timerSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(`${BASE_URL}/log-in`, values);
      dispatch(clearTimer())
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.removeItem('persist:root')
      dispatch(setUser(response.data))
      navigate('/')

    } catch (error) {
      if (error.response) {
        setFieldError('apiError', error.response.data.message);
      } else {
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
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '', apiError: '' }}
        validate={values => {
          const errors = {};
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
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
            <ErrorMessage name="apiError" component="div" className="error-message" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
