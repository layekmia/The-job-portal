import { useEffect, useState } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { useApp } from "../context/AppContext";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 6;
export default function JobListing() {
  const { searchFilter, setSearchFilter, isSearched, jobs } = useApp();
  // I didn't do it before this
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategroies] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);

  const totalPages = Math.ceil(filterJobs.length / ITEMS_PER_PAGE);
  const startInex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endINex = currentPage * ITEMS_PER_PAGE;

  const handleCategoryChange = (category) => {
    setSelectedCategroies((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilterJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocation, searchFilter]);

  return (
    <div className="container mx-auto 2xl:px-20 flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebars */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search filter from hero component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 ">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}{" "}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-3 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}{" "}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={() => setShowFilter(!showFilter)}
          className=" px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className=" px-6 py-1.5 rounded border border-gray-400 max-lg:hidden"
        >
          Filters
        </button>

        {/* Categroy filter */}
        <div className={`${!showFilter && "max-lg:hidden"}`}>
          <h4 className="font-medium text-lg py-4">Search by Categroies</h4>
          <ul className="space-y-3 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index + 1}>
                <input
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                  type="checkbox"
                  className="scale-125"
                />
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* location filter */}
        <div className={`${!showFilter && "max-lg:hidden"} pt-12`}>
          <h4 className="font-medium text-lg py-4">Search by Location</h4>
          <ul className="space-y-3 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index + 1}>
                <input
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                  type="checkbox"
                  className="scale-125"
                />
                <span>{location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job listing */}

      <div className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filterJobs.slice(startInex, endINex).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/*pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
