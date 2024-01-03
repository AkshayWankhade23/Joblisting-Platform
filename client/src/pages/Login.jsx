import { LoginForm } from "../Components/Login/LoginForm"
import LoginImage from '../assets/login.png'
export const Login = () => {
    return (
        <div style={{display:"flex"}}>
            <LoginForm/>
            <img style={{maxHeight:"100vh", width:"50vw"}}  src={LoginImage} alt="LoginImage"/>
        </div>
    )
}