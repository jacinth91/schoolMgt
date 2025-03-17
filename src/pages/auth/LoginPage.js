import React from "react";
//import LoginForm from "../../components/auth/LoginPage";
import ParentLogin from "../../components/auth/ParentLogin";


const LoginPage = () => {
  const handleLoginSuccess = () => {
    console.log("User logged in successfully!");
    // Redirect to dashboard or home page after login
  };

  return (
    <div>
      <ParentLogin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
