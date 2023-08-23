import axios from "axios";
import { useEffect, useState } from "react";
import { RecievedData } from "../atoms/types/user/userData";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import UserCards from "../molecules/cards/user-cards/UserCards";

function UnregisteredUsers() {
  const userr = useUserSelector((state) => state);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<RecievedData[]>([]);
  const [registered, setRegistered] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);

  const fetchData = async () => {
    let users: RecievedData[] = [];

    try {
      const response = await axios.get<RecievedData[]>(
        `http://localhost:5000/users/all/${userr.username}`,
        {
          headers: {
            Authorization: `Bearer ${userr.token}`,
          },
        }
      );
      response?.data.map((user) => {
        if (user.isRegistered === false) {
          users.push(user);
        }
      });

      if (users?.length) {
        setData(users);
        setLoading(false);
      } else {
        setReloading(true);
        alert("No unregistered users");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };


  useEffect(() => {
    fetchData();
    setRegistered(false);
    if (data?.length > 1) {
      setReloading(false);
    }
  }, [reloading]);
  if(data?.length < 1){
    return <div>No Unregistered Users</div>;
  }


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Sign In again</div>;
  }

  return !reloading ? (
    <div className=" mx-auto w-full h-[800px] pt-8 pb-8 overflow-y-auto">
      <div className="grid grid-cols-3" id="users">
        {data.map((user) => (
          <div
            key={user.username}
            className="flex justify-center items-center mb-7"
          >
            <UserCards
              title={user.username ?? "Default Username"}
              description={user.orgId ?? "Default Email"}
              imageUrl="https://via.placeholder.com/300"
              registered={setRegistered}
              reloading={setReloading}
            ></UserCards>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

export default UnregisteredUsers;
