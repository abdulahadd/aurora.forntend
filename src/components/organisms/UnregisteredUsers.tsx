import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserData } from '../atoms/types/user/userData';
import { useUserSelector } from '../../redux/redux-hooks/hooks';
import UserCards from '../molecules/cards/user-cards/UserCards';

function UnregisteredUsers() {


    const userr=useUserSelector((state)=>(state.user))
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<UserData[]>([]);
  
    useEffect(()=>{
  
      const fetchData = async () => {
        try {
          const response = await axios.get<UserData>(`http://localhost:5000/users/all/${userr.username}`,{
            headers: {
              Authorization: `Bearer ${userr.token}`,
            },
          }); // Replace with your API endpoint URL
        //   setData(response.data)
        console.log('response?.data',response?.data)
        const users: any = response?.data;
        // console.log("User Data", users)
        if(users?.length){
            setData(users);
            setLoading(false);
        }
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      };
  
      fetchData();
      
      console.log("Unregistered Users useEffect called")
      
  
    },[])
  
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
        return <div>Sign In again</div>;
      }
    
  
  return (

    <div className=" mx-auto w-full h-auto pt-8 pb-8">
        <div className='grid grid-cols-3'>
            {
                data.map((user)=>(
                <div key={user.username} className='flex justify-center items-center'>
                <UserCards
                    title={user.username ?? 'Default Username'}
                    description={user.email?? 'Default Email'}
                    imageUrl="https://via.placeholder.com/300"
                ></UserCards>
                </div>
                
                ))  
                
            }
        </div>
    </div>
  )
}

export default UnregisteredUsers