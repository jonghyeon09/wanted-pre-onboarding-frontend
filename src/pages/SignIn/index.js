import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isVaild, setIsVaild] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/auth/signin", {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form.email.includes("@") && form.password.length >= 8) setIsVaild(true);
    else setIsVaild(false);
  }, [form.email, form.password.length]);

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              data-testid="email-input"
              id="email-address"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              data-testid="password-input"
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>
        <button
          data-testid="signin-button"
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={isVaild ? {} : { backgroundColor: "gray" }}
          disabled={!isVaild}
          onClick={handleSignUp}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignIn;
