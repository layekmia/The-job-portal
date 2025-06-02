import moment from "moment";
import { manageJobsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function ManageJob() {
    const navigate = useNavigate()

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 border-b px-4 text-left max-sm:hidden">#</th>
              <th className="py-2 border-b px-4 text-left">Job Title</th>
              <th className="py-2 border-b px-4 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 border-b px-4 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 border-b px-4 text-center">Applicants</th>
              <th className="py-2 border-b px-4 text-left">visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={job._id} className="text-gray-700">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b">{moment(job.date).format("ll")}</td>
                <td className="py-2 px-4 border-b">{job.location}</td>
                <td className="py-2 px-4 border-b">{job.applicants}</td>
                <td className="py-2 px-4 border-b">
                  <input className="scale-125 ml-4" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
            <button onClick={() => navigate('/dashboard/add-job')} className="w-28 py-3 mt-4 bg-black text-white">Add new job</button>
        </div>
      </div>
    </div>
  );
}
