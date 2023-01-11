import { React, useState } from 'react'

export const Signup = (props) => {
  const [credentials, setcredentials] = useState({name: "",email: "", password: "", cpassword: ""})
    const handleSubmit= async (e)=>{
        e.preventDefault(); 
        const {name,email,password,cpassword}=credentials
        const response = await fetch('http://localhost:5000/api/auth/createuser', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
          body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password})
        });
        const json=await response.json(); 
        console.log(json); 
        if(json.success){
            //Save Auth Token and redirect
            localStorage.setItem('token',json.authtoken); 
            props.showAlert("Account Craeted Successfully","success");
        }
        else{
          props.showAlert("Invalid Details","danger");
        }
    }
  
  const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className='container mt-3'>
        <h2>Create an account to use iNotebook</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={credentials.name} placeholder='Enter Your Name' name='name'
              onChange={onChange} />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" value={credentials.email} placeholder='Enter Your Email' name='email'
              onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" placeholder='Confirm Your Password' name="password"
              value={credentials.password} onChange={onChange} id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder='Enter Password here' name="cpassword"
              value={credentials.cpassword} onChange={onChange} id="cpassword" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button> 
          </form>
      </div>
    </div>
  )
}
