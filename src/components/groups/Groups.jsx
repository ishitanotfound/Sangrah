import { useNavigate, Link } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center px-4 sm:px-10">
      
      {/* Create New Group button */}      
      <button
        className="hero-button absolute top-25 md:top-18 right-20"
        onClick={() => navigate("/createGroup")}
      > + Create new Group 
      </button> 

      {/* Main Items */}
      <div className="w-full mt-42 sm:mt-28 flex flex-col items-start gap-2">
        
        {/* All groups title */}
        <p className="text-xl text-[#FF7601] hover:cursor-default pl-2">All Groups</p>
        
        {/* Groups-box */}
        <div className="group-box w-full pt-2 flex flex-wrap justify-center sm:justify-start gap-4">
          
          {/* One Box x5 */}
          {[...Array(5)].map((_, i) => (
            <Link key={i} to='/groupView' className="p-2">
              <div className="card bg-[#fff]/30 rounded-3xl w-72 sm:w-80 shadow-sm p-5">
                <figure>
                  <img
                    src="flower.jpeg"
                    alt="Group-thumbnail"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </figure>
                <div className="card-body pt-3">
                  <h2 className="card-title text-xl text-gray-700 font-semibold">Group Title</h2>
                  <h3>People: Ishita, Banti Bua</h3>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
