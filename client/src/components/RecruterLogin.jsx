import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useApp } from "../context/AppContext";

export default function RecruterLogin() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");

  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruterLogin } = useApp();
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowRecruterLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [setShowRecruterLogin]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'unset'
    } 
  }, [])

  return (
    <div
      className="absolute inset-0 z-10
     backdrop-blur-sm bg-black/30 flex items-center justify-center "
    >
      <form
        onSubmit={onSubmitHandler}
        ref={formRef}
        className="relative p-10 bg-white rounded-xl text-gray-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruter {state}
        </h1>
        <p className="text-sm">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Welcome! Please sign up to continue"}
        </p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image" className="cursor-pointer">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="" 
                />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
              <p>
                Upload company <br />
                logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Company name"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                required
              />
            </div>
            {state === "Login" && (
              <p className="text-sm text-blue-600 cursor-pointer my-4">
                Forget Password
              </p>
            )}
          </>
        )}

        <button
          type="submit"
          className={`bg-blue-600 w-full text-white py-2 rounded-full ${
            state !== "Login" && "mt-4"
          }`}
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Accounnt"
            : "Next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer hover:underline text-blue-600"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer hover:underline text-blue-500"
            >
              Login
            </span>
          </p>
        )}
        <img onClick={() => setShowRecruterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
}
