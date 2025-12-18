import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ---------------- Password Validation ---------------- */
  const validatePasswords = () => {
    if (state !== "register") return true;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  /* ---------------- Submit Handler ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/${state}`,
        { name, email, phone, password }
      );

      if (data.success) {
        toast.success(`${state === "login" ? "Login" : "Signup"} successful`);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${ state === "register" ? "max-w-md" : "max-w-sm" } bg-white p-8 py-10 rounded-xl shadow-xl space-y-4`}  >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* Name */}
        {state === "register" && (
          <Input label="Name" value={name} onChange={setName} />
        )}

        <Input label="Email" type="email" value={email} onChange={setEmail} />

        {state === "register" && (
          <Input label="Phone Number" value={phone} onChange={setPhone} />
        )}

        <Input label="Password" type="password" value={password} onChange={setPassword} />

        {state === "register" && (
          <>
            <Input label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword}/>

            {/* Live mismatch warning */}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-500">
                Passwords do not match
              </p>
            )}
          </>
        )}

        {/* Toggle */}
        <p className="text-sm text-center text-gray-600">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>

        {/* Submit */}
        <button
          className="w-full bg-primary hover:bg-primary-dull text-white py-2.5 rounded-lg transition disabled:opacity-50"
          disabled={
            state === "register" &&
            (!password || password !== confirmPassword)
          }
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

/* ---------------- Reusable Input ---------------- */
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      required
    />
  </div>
);

export default Login;
