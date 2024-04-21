import React, { useEffect, useState } from 'react'
import "./home.scss"
import TimerList from '../timerComponent/TimerList'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux"
import { setTimer } from "../../redux/reducers/timerSlice"
import HistoryList from '../historyComponent/HistoryList'
import { setHelper } from '../../redux/reducers/apiHelperSlice'

import { useNavigate } from 'react-router-dom'

import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const headers = {
    'Content-Type': 'application/json',
    'token': user?.token 
  };


  const handleSubmit = async (values, actions) => {
    try {

      const timerId = parseInt(Math.random() * 1000000000).toString()
      const data = { timerName: values.timerName, duration: values.duration, timerId:  timerId, timeLeft: values.duration* 60 }
      const response = await axios.post(`${BASE_URL}/timer`, data, {headers});
      dispatch(setTimer( { totalDuration:values.duration, id: timerId, timerName:values.timerName , timeLeft: values.duration* 60 } ))
      dispatch(setHelper(timerId))

    } catch (error) {
      if (error.response) {
        actions.setFieldError('apiError', error.response.data.message);
      } else {
        console.log('errorhai-->', error.message  )
        actions.setFieldError('apiError', 'An error occurred. Please try again.');
      }
    } finally {
      actions.setSubmitting(false)
      actions.resetForm({
        values: {
          timerName: '',
          duration: '',
        },
      })
    }
  };

  // if token not found navigate to login page
  useEffect(()=>{
      if(!localStorage.getItem('user')){
         navigate('/login')
      }
  },[])


  return (

    <div className='timer_container'>

        <div className='timer_list_section'> 
                  <h2>Create New Timer</h2>

                  {/* <input 
                      type="text" 
                      name="timerName"
                      placeholder='Timer Name'
                      className='input-box'
                      value={timerName}
                      onChange={handleName}
                    />
                    <input 
                      type="number" 
                      name="duration"
                      placeholder='Time in minutes'
                      className='input-box'
                      value={totalDuration}
                      onChange={handleDuration}
                    />
                 
                    <button className="start-button" onClick={startTimer}>Start Timer</button> */}

                    <Formik
                      initialValues={{ timerName: '', duration: '', apiError: '' }}
                      validate={values => {
                        const errors = {};
                        if (!values.timerName) {
                          errors.timerName = 'Required';
                        }
                        if (!values.duration) {
                          errors.duration = 'Required';
                        }
                        else if (
                          !/^(?:[1-9]\d{0,2}|1[0-3]\d{2}|14[0-3][0-9]|1440)$/i.test(values.duration)
                        ) {
                          errors.duration = 'Values between 1 to 1440 only';
                        }
                        return errors;
                      }}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="form-group">
                            <Field type="text" name="timerName" placeholder="Timer Name" />
                            <ErrorMessage name="timerName" component="div" className="error-message" />
                          </div>
                          <div className="form-group">
                            <Field type="number" name="duration" placeholder="Time in minutes" />
                            <ErrorMessage name="duration" component="div" className="error-message" />
                          </div>
                          <div className="form-group">
                            <button type="submit" disabled={isSubmitting}>
                              Start Timer
                            </button>
                          </div>
                          <ErrorMessage name="apiError" component="div" className="error-message" />
                        </Form>
                      )}
                    </Formik>

                  <TimerList/>

        </div>

        <div className='new_timer_section'>
                <h2>Timer History</h2>

                <HistoryList/>
                    

  
        </div>

        

    </div>
  )
}

export default Home