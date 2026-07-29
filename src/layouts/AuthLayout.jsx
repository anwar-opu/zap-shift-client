import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <Logo />
      <div className="flex justify-between items-center gap-5 m-5  ">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 bg-primary/10 min-h-screen flex items-center justify-center">
          <img className="" src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
