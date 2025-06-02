import { useRef } from "react";
import { assets } from "../assets/assets";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const { setSearchFilter, setIsSearched } = useApp();

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  function onSearch() {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  }

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 capitalize">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-3xl text-sm font-light px-5 mx-auto">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="max-w-xl sm:mx-auto flex items-center  justify-between bg-white rounded-md text-gray-600 pl-4 mx-4">
          <div className="flex items-center border-r-2">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="max-sm-:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <div className="flex items-center ml-2">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="max-sm-:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 px-8 py-2 rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex items-center justify-center gap-10 flex-wrap lg:gap-16">
          <p className="font-medium text-stone-700">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="" />
          <img className="h-6" src={assets.walmart_logo} alt="" />
          <img className="h-6" src={assets.accenture_logo} alt="" />
          <img className="h-6" src={assets.samsung_logo} alt="" />
          <img className="h-6" src={assets.amazon_logo} alt="" />
          <img className="h-6" src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  );
}
