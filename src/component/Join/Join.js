import React, { useState } from 'react'
import './Join.css'
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'

let user;

const sendUser = ()=>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}

const Join = () => {

  const [name, setname] = useState("");
  console.log(name);
  return (
    <div className='JoinPage'>
       <div className='JoinContainer'>
          <img src={logo} alt='logo' />
          <h1>ChitChat</h1>
          <input onChange={(e)=> setname(e.target.value)} placeholder='Enter your name' type='text' id='joinInput'/>
          <Link to='/chat' onClick={(e)=> !name ? e.preventDefault() : null}>
          <button onClick = {sendUser} className='joinBtn'>Login</button>
          </Link>
       </div>
    </div>
  )
}

export default Join
export {user}