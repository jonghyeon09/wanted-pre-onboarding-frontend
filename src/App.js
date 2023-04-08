import { useEffect } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      if (pathname === "/signin" || pathname === "/signup") navigate("/todo");
    }
    if (!token) {
      if (pathname === "/todo") navigate("/signin");
    }
  }, [navigate, pathname]);

  return (
    <div className="App">
      <header className="h-10 flex justify-center items-center gap-8 bg-black text-white mb-4">
        <NavLink to={"signup"}>
          <span>회원가입</span>
        </NavLink>
        <NavLink to={"signin"}>
          <span>로그인</span>
        </NavLink>
        <NavLink to={"todo"}>
          <span>TODO LIST</span>
        </NavLink>
        <NavLink to={"signin"}>
          <span onClick={() => localStorage.removeItem("token")}>로그아웃</span>
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
