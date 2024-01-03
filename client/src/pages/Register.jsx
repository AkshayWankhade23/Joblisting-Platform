import {RegisterForm} from '../Components/Register/RegisterForm'
import LoginImage from "../assets/login.png"

export const Register = ()=>{
    return (
        <div style={{display:"flex"}}>
            <RegisterForm/>
            <img style={{maxHeight:"100vh", width:"50vw"}}  src={LoginImage} alt="RegisterImage"/>
        </div>
    )
}