
import { useUserSelector } from '../../app/hooks';
import LoginForm from '../molecules/Forms/LoginForm';

const Login = () => {

  const userr = useUserSelector((state) => state.user);
  console.log("User : ", userr)

  return (

    <LoginForm ></LoginForm>

  );
};

export default Login;
