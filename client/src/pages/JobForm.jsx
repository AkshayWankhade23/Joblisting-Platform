import { JobForm } from "../Components/JobForm/JobForm";
import JobImage from '../assets/job.png'

export const AddJob = ()=>{
    return(
        <div style={{display:"flex"}}>
            <JobForm/>
            <img style={{maxHeight:"100vh", width:"50vw"}}  src={JobImage}/>
        </div>    
        )
}