import { createContext, useContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruterLogin, setShowRecruterLogin] = useState(false);

  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruterLogin,
    setShowRecruterLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
