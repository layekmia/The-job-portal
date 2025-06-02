import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useApp } from "../context/AppContext";

export default function NavBar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const {setShowRecruterLogin} = useApp();

  return (
    <header className="shadow py-4">
      <nav className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={() => navigate('/')} className="max-sm:w-28 cursor-pointer" src={assets.logo} alt="" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/application">Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button className="text-gray-600" onClick={() => setShowRecruterLogin(true)}>Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
