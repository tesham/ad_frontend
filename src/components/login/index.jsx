import React from "react";
import LoginUser from "./LoginUser";

const Login = () => {
  return (
    <>
      <div
        style={{
          background: "rgb(146, 182, 193)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginUser />
      </div>
    </>
  );
};

export default Login;
