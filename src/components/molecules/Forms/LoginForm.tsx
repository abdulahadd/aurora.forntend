import React, { useState } from 'react'
import { useUserDispatch, useUserSelector } from '../../../app/hooks';
import { updateUserState } from '../../../features/users/user-slice';
import { Link } from 'react-router-dom';
import bgimg from '../../../assets/st.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokenToString } from 'typescript';
import { useSelector } from 'react-redux';




const LoginForm=()=> {

  let navigate =useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const userr=useUserSelector((state)=>(state.user))

  

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


  async function handleSubmit(e:any){
    e.preventDefault()

    if (!user.username.trim() || !user.password.trim()) {
      // Perform some action to indicate that the fields are required, e.g., show an error message
      alert('Please enter username or password.');
      return; // Stop the function here to prevent further execution
    }

    const postData={
      username: user.username,
      password: user.password

    }

    try {

  
      const response = await axios.post('http://localhost:5000/auth/login', postData);
      console.log('Response: ', response.data);
      const token=response.data;
      dispatch(updateUserState({...user, token:token}));
      console.log("token", token )
      console.log("User react state", userr )
      navigate("/dashboard")
    } catch (error) {
      // Handle errors, if any
      console.error('Error: ', error);
    }

    setUser({
      username: '',
      password: '',
    });

    

  }

  return(
    <div className="grid grid-cols-2 sm:grid-cols-2 h-screen w-full">
    <div className='hidden sm:block '>
      <img className='w-full h-full' src={bgimg} alt='/'/>
    </div>
    <div className='bg-purple-400 flex flex-col justify-center '>
      <form className='max-w-[410px] w-full mx-auto p-4 border-2  rounded-xl bg-indigo-200 border-blue-400 mt-15' >
        <h2 className='text-4xl font-bold text-center py-6'>AURORA.</h2>
        <div className='flex flex-col py2'>
          <label className='text-left'>Username</label>
          <input className='border p-2' value={user.username} onChange={handleUsernameChange} type='text'/>
        </div>
        <div className='flex flex-col py2'>
          <label className='text-left'>Password</label>
          <input className='border p-2' value={user.password} onChange={handlePasswordChange} type='password'/>
        </div>
        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400 text-white'  onClick={handleSubmit}>Sign In</button>
        <div className='flex justify-between'>
          <p className='flex-items-center'><input className='mr-2' type='checkbox'/> Remember me</p>
          <Link to='/signup' >Create an account</Link>
        </div>
      </form>
    </div>

  </div>

  );
}

export default LoginForm;