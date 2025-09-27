import React from 'react'
import { useState } from 'react';
import {ShipWheelIcon} from "lucide-react"
import { Link } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';


const SignUpPage = () => {

const [signupData, setSignupData] = useState({
 fullName: "",
 email: "",
 password: "",
});

const queryClient = useQueryClient()


const {mutate, isPending, error} = useMutation({
  mutationFn: async () =>{
      const response = axiosInstance.post("/auth/signup", signupData);
      return (await response).data;
  },

  onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"]}),

})

const handleSignup = (e) => {
  e.preventDefault()
    mutate()
}

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest"> 

    <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

      {/* SIGNUP FORM - LEFT SIDE*/}
      
              <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>

                    {/* LOGO */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                      <ShipWheelIcon className='size-9 text-primary' />
                      <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                        MML Connect
                      </span>
                    </div>

                    <div className='w-full'>
                        <form onSubmit={handleSignup}>

                          <div className='space-y-4'>
                            <div>
                              <h2 className='text-xl font-semibold'>Create an Account</h2>
                              <p>
                                Join MML Connect and Connect with professionals
                              </p>
                            </div>

                            <div className='space-y-3'>

                              {/* Full Name */}
                                <div className='form-control w-full'>
                                  <label className='label'>
                                    <span className='label-text'>Full Name</span>
                                  </label>
                                  <input type='text'
                                    placeholder='Yohan Ranasingha'
                                    className='input input-bordered w-full'
                                    value={signupData.fullName}
                                    onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                                    required
                                  />
                                </div>

                                {/* Email */}
                                <div className='form-control w-full'>
                                  <label className='label'>
                                    <span className='label-text'>Email</span>
                                  </label>
                                  <input type='email'
                                    placeholder='yohan@email.com'
                                    className='input input-bordered w-full'
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                    required
                                  />
                                </div>

                          {/* Password */}
                                <div className='form-control w-full'>
                                  <label className='label'>
                                    <span className='label-text'>Password</span>
                                  </label>
                                  <input type='password'
                                    placeholder='******************'
                                    className='input input-bordered w-full'
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                    required
                                  />
                                  <p className='text-xs opacity-70 mt-1'>
                                    Password Must be at least 6 characters
                                  </p>
                                </div>


                            
                                {/* Terms and agreements */}
                                <div className='form-control'>
                                  <label className='label cursor-pointer justify-start gap-2'>
                                  
                                  <input type='checkbox' className='checkbox checkbox-sm' required/>
                                    <span className='text-xs leading-tight'>
                                    agree to the{" "}

                                      <span className='text-primary hover:underline'>terms of service</span> and{" "}
                                      <span className='text-primary hover:underline'>privacy policy</span>
                                    </span>
                                    </label>
                                </div>


                            </div>
                                    <button className='btn btn-primary w-full' type='submit'>
                                      {isPending ? "Signing up..." : "Create Account"}
                                    </button>
                                        <div className='text-center mt-4'>
                                              <p className='text-sm'>
                                                  Already Have an account? {" "}
                                                    <Link to='/login' className='text-primary hover:underline'>
                                                    Sign in
                                                    </Link>
                                              </p>
                                        </div>
                          </div>
                        </form>
                    </div>
              </div>


              {/* SIGNUP FORM - RIGHT SIDE */}
              <div className='hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center'>
                <div className='max-w-md p-8'>

                    {/* ILLUSTRATION */}

                    <div className='relative aspect-square max-w-sm mx-auto'>
                            <img src="/signin.png" alt="MML Connect Image" className='w-full h-full' />
                    </div>

                    <div className='text-center space-y-3 mt-6'>
                      <h2 className='text-xl font-semibold'>Connect with MML partners in Sri Lanka</h2>
                      <p className='opacity-70'>
                        Build conversations, make learned friends, improve your connectivity platform in the world of Law
                      </p>
                    </div>
                  
                </div>
              </div>
    </div>

    </div>
  )
}

export default SignUpPage
