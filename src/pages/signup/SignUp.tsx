import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUpForm from "../../components/molecules/forms/SignUpForm";

const SignUp = () => {
  let navigate = useNavigate();

  const [error, setError] = useState(true);
  useEffect(() => {
    if (!error) {
      handleNavigate();
    }
  }, [error]);

  const handleNavigate = () => {
    navigate("/");
  };

  return <SignUpForm setError={setError}></SignUpForm>;
};

export default SignUp;
