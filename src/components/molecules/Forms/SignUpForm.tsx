
import bgimg from '../../../assets/st.jpeg'
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from 'react';
import DropDown from '../../atoms/buttons/dropdowns/Dropdown';
import { PostData, UserData } from '../../atoms/types/user/userData';
import { RoleType } from '../../atoms/types/roles/RoleType';
import { OrganisationType } from '../../atoms/types/Organisation/OrgData';
import axios from 'axios';

type SignUpProp={
    setError: (value: boolean)=>void;
}


const SignUpForm = (porps:SignUpProp) => {


    const [selectRole, setSelectRole]=useState("Select");
    const [selectOrga, setSelectOrga]=useState("Select");


  const {register, handleSubmit,formState : {errors}, reset} = useForm<UserData>();

  const [userData, setUserData]= useState<UserData>({
    username:'',
    email:'',
    password:'',
    age: 0,
    orga:'',
    role:'',
});

   
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [roles,setRoles]=useState({
      list: [],
    })
    const [orgs,setOrgs]=useState({
      list: [],
    })

    const effectCalled = useRef(false);

    //---------------useEffect-------------------------------//


    useEffect(()=>{
      if (effectCalled.current) return;

      fetch('http://localhost:5000/roles')
      .then((response) => response.json())
      .then((json) => {
        // Assuming the JSON response is an array of objects with a "name" property
        const roleNames = json.map((role:RoleType) => role.name!=="SuperUser" && role.name );
        setRoles({ list: roleNames });
      })
      .catch((error) => console.error(error));
  
  
      fetch('http://localhost:5000/org')
      .then((response) => response.json())
      .then((json) => {
        // Assuming the JSON response is an array of objects with a "name" property
        const organizationNames = json.map((org:OrganisationType) => org.name);
        setOrgs({ list: organizationNames });
      })
      .catch((error) => console.error(error));

      console.log("use effect called")
      

    },[])



    const postRequest = async (obj:UserData) => {

      const postData:PostData={
        username:obj.username,
        email:obj.email,
        password:obj.password,
        age: obj.age,
        orgId:obj.orga,
        role:obj.role,
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



    const onSubmit: SubmitHandler<UserData> = data => {
      console.log("Errors" , errors)
      console.log('FormData', data)
      const obj={...userData, ...data}
      console.log('object', obj);
      postRequest(obj);
      if(!!errors){
        porps.setError(false)
      }

     setSelectOrga("Select");
     setSelectRole("Select");
      
      reset();
     
  }

    const SelectHandler = (inputString: string, key:any) => {
      console.log('Input', inputString);
      console.log('key', key);
      const updatedUserData: any = { ...userData };
      updatedUserData[key] = inputString;
      console.log("updated", updatedUserData)
      setUserData(updatedUserData);
    };
  


  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 h-screen w-full">
      <div className='hidden sm:block '>
        <img className='w-full h-full' src={bgimg} alt='/'/>
      </div>
      <div className='bg-purple-400 flex flex-col justify-center '>
        <form className='max-w-[410px] w-full mx-auto bg-indigo-200 p-4 border-2 rounded-xl border-blue-400 mt-15' onSubmit={
        handleSubmit(onSubmit)
        } >
                <div className='w-full '>
                    <h2 className='text-4xl font-bold text-center py-6'>AURORA.</h2>
                </div>
          
          <div className='flex flex-col py2'>
            <label className='text-left'>Username</label>
            <input className='border p-2  mt-2 mb-1' {...register("username", { required: true })} type='text'/>
            <p className='text-left text-red-900 mb-2'>{errors.username && "Username is required"}</p>

          </div>
          <div className='flex flex-col py2'>
            <label className='text-left '>Email</label>
            <input className='border p-2 mt-2 mb-1' {...register("email", { required: true })} type='email'/>
            <p className='text-left text-red-900 mb-2'>{isSubmitted && errors.email && "Email is required"}</p>
            
          </div>
          <div className='flex flex-col py2'>
            <label className='text-left '>Password</label>
            <input className='border p-2 mt-2 mb-1' {...register("password", { required: true })} type='password'/>
            <p className='text-left text-red-900 mb-2'>{isSubmitted && errors.password && "Password is required"}</p>
            
          </div>
          <div className='flex flex-col py2'>
            <label className='text-left'>Age</label>
            <input className='border p-2 mt-2 mb-1' {...register("age", { required: true })} type='number'/>
            <p className='text-left text-red-900 mb-2'>{isSubmitted && errors.age && "Age is required"}</p>
          </div>

          <div className='flex flex-col py2'>
            <label className='text-left '>Organisation</label>
            <div className='mb-1 w-full text-bottom flex flex-col items-center'>
                  <DropDown items={orgs.list} SelectHandler={SelectHandler}  fieldType="orga" select={selectOrga} setSelect={setSelectOrga}/>
            </div>
          </div>

          <div className='flex flex-col py2'>
            <label className='text-left mt-6'>Register as</label>
            <div className=' mb-4 w-full text-bottom flex flex-col items-center'>
                  <DropDown items={roles.list} SelectHandler={SelectHandler} fieldType="role" select={selectRole} setSelect={setSelectRole}/>
             </div>
          </div>
        
          <button className='border w-full my-5  py-2 bg-indigo-600 hover:bg-indigo-400 text-white' type="submit" onClick={()=>( setIsSubmitted(true))}>Register</button>
          
        </form>
      </div>

    </div>
  );
};

export default SignUpForm;


