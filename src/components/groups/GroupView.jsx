import { Link } from "react-router-dom";

export default function GroupView() {
  return (
    <section className="all-lists-in-group relative min-h-screen flex flex-col items-start px-4 sm:px-10">
      <div className="main-content mt-24 w-full">
        {/* Title */}
        <p className="text-xl text-[#FF7601] hover:cursor-default pl-1 sm:pl-10 mt-2">
          All lists
        </p>

        {/* Cards Container */}
        <div className="all-lists-box w-full pt-4 sm:px-10 flex flex-wrap justify-center sm:justify-start gap-4">
          {[...Array(5)].map((_, i) => (
            <Link key={i} to="/listShow" className="w-full sm:w-auto">
              {/* Box */}
              <div className="card bg-[#fff]/30 rounded-3xl shadow-sm p-5 sm:p-5 w-full sm:w-85 max-w-xs">
                <div className="card-body flex flex-col gap-1">
                  <h2 className="card-title text-xl sm:text-2xl text-gray-700 font-semibold">
                    List title
                  </h2>
                  <h3 className="text-sm sm:text-base">Start: 08/07/25</h3>
                  <h3 className="text-sm sm:text-base">End: 14/07/25</h3>
                  <h3 className="text-sm sm:text-base">By: Babu</h3>
                  <progress
                    className="progress progress-success w-full"
                    value="40"
                    max="100"
                  ></progress>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
