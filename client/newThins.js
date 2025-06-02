// searhFilter();



// paginaiton ;
{
  jobs.length > 0 && (
    <div
      className="flex items-center justify-center space-x-2 mt-10
            "
    >
      <a href="#job-list">
        <img
          onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
          src={assets.left_arrow_icon}
          alt=""
        />
      </a>
      {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, index) => (
        <a href="#job-list">
          <button
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
              currentPage === index + 1
                ? "bg-blue-100 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {index + 1}
          </button>
        </a>
      ))}
      <a href="#job-list">
        <img
          onClick={() =>
            setCurrentPage(
              Math.min(currentPage + 1, Math.ceil(jobs.length * 6))
            )
          }
          src={assets.right_arrow_icon}
          alt=""
        />
      </a>
    </div>
  );
}

const [currentPage, setCurrentPage] = useState(1);
{
  jobs
    .slice((currentPage - 1) * 6, currentPage * 6)
    .map((job) => <JobCard key={job.id} job={job} />);
}
