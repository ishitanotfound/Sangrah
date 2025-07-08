import { Link } from "react-router-dom";

export default function GroupView() {
  return (
    <section className="all-lists-in-group relative min-h-screen flex flex-col items-start px-4 sm:px-10">
        <div className="main-content absolute mt-20">
            <p className="text-xl text-[#FF7601] hover:cursor-default pl-2 mb-5">All lists</p>
            <div className="all-lists-box flex flex-wrap">
                {[...Array(5)].map((_, i) => (
                    <Link key={i} to='/listShow'>
                        
                        {/* box-1 */}
                        <div className="box-1">
                            <div className="card card bg-[#fff]/30 rounded-3xl w-72 sm:w-85 shadow-sm p-5 m-2">
                                <div className="card-body flex flex-col gap-1">
                                    <h2 className="card-title text-2xl text-gray-700 font-semibold">List title</h2>
                                    <h3>Start: 08/07/25</h3>
                                    <h3>End: 14/07/25</h3>
                                    <h3>By: Babu</h3>
                                    <progress className="progress progress-success w-56" value="40" max="100"></progress>
                                </div>
                            </div>
                        </div>

                    </Link>
                ))}                
            </div>
        </div>
    </section>
  )
}
