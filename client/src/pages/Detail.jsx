import { useState } from "react";
import { Navbar } from "../Components/Navbar/Navbar"
import { Details } from "../Components/Detail/Detail"
export const Detail = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!window.localStorage.getItem("user"),
      );
    
      const handleLogout = () => {
        setIsLoggedIn(false);
      };
    return(
        <div style={{background:" #FFEFEF",overflowX:"hidden"}}>
            <Navbar onLogout={handleLogout} />
            <Details isLoggedIn={isLoggedIn} />
        </div>
    )
}