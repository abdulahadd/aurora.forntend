
import { useNavigate } from 'react-router-dom';
import { PostData, UserData } from '../atoms/types/user/userData';
import { useEffect, useState } from 'react';
import SignUpForm from '../molecules/Forms/SignUpForm';
import axios from 'axios';


//---------------------------function---------------------------

const SignUp = () => {
  let navigate =useNavigate();

    const [userData, setUserData]= useState<UserData>({
      username:'',
      email:'',
      password:'',
      age: 0,
      orga:'',
      role:'',
  });

    const [error, setError] = useState(true);

 

    useEffect(()=>{
      console.log("Signup Page Useffect called")
      console.log("UserData", userData);
     
    },[userData])


   
    const handleNavigate=()=>{
      navigate('/');
    }

    const postRequest = async () => {

      const postData:PostData={
        username:userData.username,
        email:userData.email,
        password:userData.password,
        age: userData.age,
        orgId:userData.orga,
        role:userData.role,
        isRegistered:false
      };

      try {
  
        const response = await axios.post('http://localhost:5000/users', postData);
        console.log('Response: ', response.data);
  
        // Do something with the response if needed
      } catch (error) {
        // Handle errors, if any
        console.error('Error: ', error);
      }



      
    };
    

    if(!error){
      postRequest();
      handleNavigate();
    }




  return (

    <SignUpForm userData={userData} setUserData={setUserData} setError={setError}></SignUpForm>
    

  );
};

export default SignUp;

