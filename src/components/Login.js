import { React, useState } from 'react'

export const Login = (props) => {
    const [credentials, setcredentials] = useState({email: "", password: ""})
    const handleSubmit= async (e)=>{
        e.preventDefault(); 
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
          body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        const json=await response.json(); 
        console.log(json); 
        if(json.success){
            //Save Auth Token and redirect
            localStorage.setItem('token',json.authtoken);     //yaha auth token save karae hai
            props.showAlert("Logged In Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className='container mt-3'>
        <h2>Login To Continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} placeholder='Enter Your Email' name='email'
             onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" placeholder='Enter Password here' name="password"
             value={credentials.password} onChange={onChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button> 
        </form>
    </div>
  )
}
