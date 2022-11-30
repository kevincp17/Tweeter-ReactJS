import React, { useState, useEffect,useCallback } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useFormik } from 'formik'
import { LoginRequest,RegisterRequest } from '../redux-saga/Action/LoginPageAction'

export default function LoginPage(){
    const navigate = useNavigate()
    const location=useLocation();
    const dispatch = useDispatch()
    const [selectLogin,setSelectLogin]=useState(true)

    const formikLogin = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
                const payload = {
                    username: values.username,
                    password: values.password
                };

                sessionStorage.setItem('username',values.username)
                dispatch(LoginRequest(payload))
                navigate('/')
            }
        })
    
        const formikRegister = useFormik({
          initialValues: {
              name: '',
              username: '',
              password: ''
          },
          onSubmit: async (values) => {
              const payload = {
                name: values.name,
                username: values.username,
                password: values.password
              };
              console.log(values);
              dispatch(RegisterRequest(payload))
              setSelectLogin(true)
          }
        })

    return(
        <div className='bg-gray-50 h-screen pt-32 pl-96'>
            <div className={selectLogin ? 'flex flex-col items-center space-y-4 bg-white w-6/12 h-80 p-3 ml-12 border border-gray-200 rounded-lg shadow' : 'flex flex-col items-center space-y-4 bg-white w-6/12 h-96 p-3 ml-12 border border-gray-200 rounded-lg shadow'}>
                <div className='flex flex-col items-center space-y-3'>
                    <FontAwesomeIcon  className="h-10 w-10 mr-2 text-cyan-400" icon={solid('mountain-sun')}/>
                    {
                        selectLogin
                        ?
                        <div className='font-semibold text-2xl'>Log in to Tweeter</div>
                        :
                        <div className='font-semibold text-2xl'>Sign up for Tweeter</div>
                    }
                    
                </div>

                <div className='flex flex-col items-center space-y-3 w-full'>
                    {
                        selectLogin
                        ?
                        null
                        :
                        <div className='w-full'>
                            <input 
                            className='w-full h-10 bg-gray-50 border-b-2 border-cyan-400 rounded pl-3' 
                            type='text' 
                            placeholder='Name'
                            name="name"
                            id="name"
                            value={formikRegister.values.name}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            autoComplete="name"
                            />
                        </div>

                    }

                    <div className='w-full'>
                        <input 
                        className='w-full h-10 bg-gray-50 border-b-2 border-cyan-400 rounded pl-3' 
                        type='text' 
                        placeholder='Username'
                        name="username"
                        id="username"
                        value={selectLogin ? formikLogin.values.username : formikRegister.values.username}
                        onChange={selectLogin ? formikLogin.handleChange :formikRegister.handleChange}
                        onBlur={selectLogin ? formikLogin.handleBlur : formikRegister.handleBlur}
                        autoComplete="username"
                        />
                    </div>

                    <div className='w-full'>
                        <input 
                        className='w-full h-10 bg-gray-50 border-b-2 border-cyan-400 rounded pl-3' 
                        type='password' 
                        placeholder='Password'
                        name="password"
                        id="password"
                        value={selectLogin ? formikLogin.values.password : formikRegister.values.password}
                        onChange={selectLogin ? formikLogin.handleChange :formikRegister.handleChange}
                        onBlur={selectLogin ? formikLogin.handleBlur : formikRegister.handleBlur}
                        autoComplete="password"
                        />
                    </div>
                </div>

                <div className='flex flex-col items-center space-y-3 w-full'>
                    <div className='w-full text-white font-semibold'>
                        {
                            selectLogin
                            ?
                            <button className='w-full h-10 bg-cyan-400 rounded' onClick={formikLogin.handleSubmit}>Log in</button>
                            :
                            <button className='w-full h-10 bg-cyan-400 rounded' onClick={formikRegister.handleSubmit}>Sign up</button>
                        }
                        
                    </div>

                    {
                            selectLogin
                            ?
                            <div className='flex flex-row space-x-3 text-cyan-400'>
                                <button className='transition hover:text-cyan-600'>Forgot your password?</button>

                                <button className='transition hover:text-cyan-600' onClick={()=>setSelectLogin(false)}>Sign up for Tweeter</button>
                            </div>
                            :
                            <div className='flex flex-row space-x-3 text-cyan-400'>
                                <button className='transition hover:text-cyan-600' onClick={()=>setSelectLogin(true)}>Log in for Tweeter</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}