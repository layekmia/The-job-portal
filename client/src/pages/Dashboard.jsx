import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Dashboard() {
  const navigate = useNavigate();

  const navLinks = [
    {
      to: "/dashboard/add-job",
      icon: assets.add_icon,
      label: "Add Jobs",
    },
    {
      to: "/dashboard/manage-jobs",
      icon: assets.home_icon,
      label: "Manage Jobs",
    },
    {
      to: "/dashboard/view-applications",
      icon: assets.person_tick_icon,
      label: "View Applications",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header/NavBar */}
      <header className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            src={assets.logo}
            alt="Company Logo"
            className="max-sm:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, GreatStack</p>
            <div className="relative group">
              <img
                src={assets.company_icon}
                alt="Company Icon"
                className="w-8 border rounded-full"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="bg-white border text-sm rounded-md p-2">
                  <li className="py-1 px-2 cursor-pointer hover:bg-gray-100">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex">
        {/* Sidebar Navigation */}
        <aside className="min-h-screen border-r-2 bg-white">
          <nav className="pt-5">
            <ul className="flex flex-col text-gray-800">
              {navLinks.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
                     ${isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""}`
                  }
                >
                  <img className="min-w-4" src={icon} alt="" className="w-5 h-5" />
                  <span className="max-sm:hidden">{label}</span>
                </NavLink>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area (placeholder for now) */}
        <section className="">
         <Outlet/>
        </section>
      </main>
    </div>
  );
}
