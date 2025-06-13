import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

import Header from './components/Header'
import Footer from './components/Footer'
import fetchUserDetails from './utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import {setUserDetails} from './store/userSlice'

const App = () => {

  const dispatch=useDispatch()
  const fetchUser =async()=>{
    const userData =await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
    
   
    
  }
useEffect(()=>{
  fetchUser()

},[])
 
  return (
    <>
    <Header/>
   <main className="min-h-[95vh] w-full ">
   <Outlet/>
   </main>
    <Footer/>
    <Toaster position="top-right" />
    </>
  )
}

export default App