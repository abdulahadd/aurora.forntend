import React, { useEffect, useState } from 'react'
import { useUserDispatch } from '../../../redux/redux-hooks/hooks';
import { updateUserState } from '../../../redux/slices/users/user-slice';
import { Link } from 'react-router-dom';
import bgimg from '../../../assets/pngs/182-_converted_.png'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';



const LoginForm=()=> {

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const dispatch= useUserDispatch();
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      username: event.target.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  useEffect(()=>{
    const token="";
    dispatch(updateUserState({...user, token:token, role:""}));
    console.log("use effect login form called")
    

  },[])


  async function handleSubmit(e:any){
    e.preventDefault()

    if (!user.username.trim() || !user.password.trim()) {
      // Perform some action to indicate that the fields are required, e.g., show an error message
      alert('Please enter username or password.');
      return; // Stop the function here to prevent further execution
    }

    const postData={
      username: user.username,
      password: user.password,

    }

    try {

  
      const response = await axios.post('http://localhost:5000/auth/login', postData);
      const token=response.data.access_token;
      const role=response.data.payload.role;
      console.log("Role : " ,role)
      
      if(token?.length)
      {
        dispatch(updateUserState({...user, token:token, role:role}));
      }
      
      console.log("token", token )
    } catch (error) {
      // Handle errors, if any
      console.error('Error: ', error);
      alert("Incorrect username or password");
    }

    setUser({
      username: '',
      password: '',
    });
    

  }


  

  return(

    <div className='h-screen flex items-center justify-center bg-indigo-100'>
      <div className="flex h-5/6 w-5/6 bg-white">
        <div className='flex items-center h-full w-7/12 justify-center bg-slate-400'>
          <img className='w-full h-full' src={bgimg} alt='/'></img>
        </div>
        <div className='bg-white flex items-center w-full md:w-5/12 justify-center'>
        <form className='h-3/5 w-3/5 mx-auto p-4 border-2 rounded-xl bg-slate-400  mt-15 drop-shadow-xl' >
            <h2 className='text-4xl font-bold text-center py-8'>AURORA.</h2>
            <div className='flex flex-col py-2'>
              <label className='text-left py-2'>Username</label>
              <input className='border p-2' value={user.username} onChange={handleUsernameChange} type='text'/>
            </div>
            <div className='flex flex-col py-2'>
              <label className='text-left pb-2'>Password</label>
              <input className='border p-2' value={user.password} onChange={handlePasswordChange} type='password'/>
            </div>
            <button className=' w-full my-5 py-2 bg-purple-900 hover:bg-indigo-400 text-white'  onClick={handleSubmit}>Sign In</button>
            <div className='flex justify-between'>
              <p className='flex-items-center'><input className='mr-2' type='checkbox'/> Remember me</p>
              <Link to='/signup' >Create an account</Link>
            </div>
          </form>
        </div>
        
      </div>
  </div>

  );
}

export default LoginForm;