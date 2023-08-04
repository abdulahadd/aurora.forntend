
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignUpForm from '../molecules/Forms/SignUpForm';



//---------------------------function---------------------------

const SignUp = () => {
  let navigate =useNavigate();

  

    const [error, setError] = useState(true);
    useEffect(()=>{
      console.log("Signup Page Useffect called")
     
      if(!error){
        handleNavigate();
      }
    },[error])


   
    const handleNavigate=()=>{
      navigate('/login');
    }

  return (

    <SignUpForm  setError={setError}></SignUpForm>
    
  );
};

export default SignUp;

