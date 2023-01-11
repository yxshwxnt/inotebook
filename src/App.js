import "./App.css";
import { React, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About }  from "./components/About"; 
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  const [alert, setalert] = useState(null)
  return (
    <>
    <NoteState> 
      <Navbar /> 
      <Alert alert={alert}/> 
        <div className="container"> 
        <Home />
        <About/> 
        <Login alert={alert}/> 
        <Signup alert={alert}/>
      </div> 

      {/* <Router> 
        <Navbar />
      <Alert message="This is amazing React course" />
        <div className="container">
          <Home />
          <Routes>
            <Route path="/" element={<Home/>}>
              <Home />
            </Route>
            <Route path="/about" element={<About/>}>
              <About />
            </Route>
        </Routes>
        </div>
      </Router> */}
    </NoteState>
    </>
  );
}

export default App;
