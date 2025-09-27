import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import Notifications from './pages/Notifications'

const App = () => {
  return (
    <div className='h-screen' data-theme="night">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/call" element={<CallPage/>} />
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/onboarding" element={<OnboardingPage/>} />
      </Routes>
    </div>
  )
}

export default App
