import React, {useState} from 'react'
import { Listing } from '../Components/Listing/Listing'
import { Navbar } from "../Components/Navbar/Navbar"

export const JobListing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!window.localStorage.getItem("user"),
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
    <Navbar onLogout={handleLogout} />
    <Listing isLoggedIn={isLoggedIn} />
    </>
  )
}
