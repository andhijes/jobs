import React, {useState, useEffect} from 'react'
import Input from '../components/Input'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
// import { Input, TextField } from '@material-ui/core';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

export default function SignIn() {
    const LOCAL_STORAGE_KEY = 'auth.user'
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    //gw tambahin aj stateudah login
    const [udahLoginSob,setUdahLoginSob]=useState(false);

    //buat cek ada user ato gak
    useEffect(() => {
        let authUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (authUser !== null) {
            setUdahLoginSob(true)
        }
      }, []);

    const HandleFormSubmit = (event) => {
        setLoading(true)
        callApi(form)
        event.preventDefault()
          
    }

    const HandleInput = (event) => {
        event.preventDefault(event)
        const {name, value} = event.target
        setForm(prevForm => {
            return {
                ...prevForm,
                [name] : value
            }
        })
    }

    const callApi = (submit) => {
        let axiosConfig = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
           axios.post(
            `/user/signin`,
            {
              email: submit.email,
              password: submit.password
            },
            axiosConfig
          )
            .then(res => {
              const data = res.data
              if(data.success === true){
                  setLoading(false)
                  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))

                  //udah jadiin true kolo berhasil
                  window.location = "/dashboard";
                  setUdahLoginSob(true);
              }
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    return (
        <>
            {/* ingat semua di react itu component js redirect bs jalan disini juga sob wkwkwkwk tinggal cek kolo true jalanin aj */}
            {udahLoginSob && <Redirect to='/' />}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="mb-4">Sign In</h3>
                        <form onSubmit={HandleFormSubmit}>
                            <Input
                                name="email"
                                type="email"
                                labelName="Email address:"
                                HandleInput={HandleInput}
                                value={form.email}
                            />

                            <Input      
                                name="password"
                                type="password"
                                labelName="Password:"
                                HandleInput={HandleInput}
                                value={form.password}
                            />

                            <div className="d-flex w-100 justify-content-between">
                                <button type="submit" className="btn btn-default btn-primary">Submit</button>
                                {loading && 
                                    <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                    </div>
                                }
                            </div>
                            
                        </form>
                    </div>
                    <div className="col-lg-6">
                        {/* <div className="alert alert-primary mb-4">
                            Or sign in using third-party services
                        </div>
                        <div className="text-center">
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Login With Google"
                                className="btn btn-outline-danger"
                            />
                        </div> */}
                    
                    </div>
                </div>
                
            </div>
        </>
    )
}
