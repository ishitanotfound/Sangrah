import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchGroups, deleteGroup } from "../../api/groupAPI";

export default function Groups() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef([]);
  const [group, setGroup] = useState([]);
  const { id } = useParams();

  useEffect(() => {
      const getGroups = async () => {
        const res = await fetchGroups();
        if (res.groups) {
          console.log(res.groups);
          setGroup(res.groups);
          console.log(res.message);
        } else {
          console.log("Error fetching groups:", res.error);
        }
      };
      getGroups();
    }, []);

  // To select kis group ka drop-down kholna h
  const handleDropdown = (index) => {     
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current[openDropdown] &&
        !dropdownRef.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <section className="relative min-h-screen flex flex-col items-center px-4 sm:px-10">
      
      {/* CREATE-NEW-GROUP BUTTON ------------------------------------------------*/}
      <button
        className="hero-button absolute top-25 md:top-18 right-20"
        onClick={() => navigate("/createGroup")}
      >
        + Create new Group
      </button>

      {/* GROUP-BOX --------------------------------------------------------------*/}
      <div className="w-full mt-42 sm:mt-28 flex flex-col items-start gap-2">
        
        {/* ALL-GROUPS TITLE */}
        <p className="text-xl text-[#FF7601] hover:cursor-default pl-4 sm:pl-13">All Groups</p>

        {/* ALL-GROUP-CARDS=========================================================*/}
        <div className="group-box w-full pt-2 sm:px-10 flex flex-wrap justify-center sm:justify-start gap-4">
          {group.map((g,index) => (
            <div
              key={index} // index of each group from groups array
              className="relative p-2 w-72 sm:w-80"
              ref={(el) => (dropdownRef.current[index] = el)}
              onClick={() => navigate(`/groupView/${g._id}`)}  
            >
              <div className="card bg-[#fff]/30 rounded-3xl shadow-sm p-5 w-full cursor-pointer">
                <figure> 
                  <img
                    src={g.groupPic} 
                    alt="Group-thumbnail"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </figure>

                <div className="flex justify-between items-start pt-3 relative">
                  <div className="card-body">                 
                    <h2 className="text-xl text-gray-700 font-semibold">{g.name}</h2>   
                    <h3 className="text-sm">{g.members.map((m) => m.username).join(", ")}</h3>
                  </div>

                  {/* GROUP-DROPDOWN */}
                  <button
                    className="text-gray-700 hover:text-[#FF7601] text-xl z-20 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDropdown(index);
                    }}
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>

                  {openDropdown === index && (
                    <ul
                      className="absolute right-0 top-10 bg-white text-sm z-30 shadow-md rounded-lg w-44 p-2 space-y-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <li
                        className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate(`/updateGroup/${g._id}`)} // PUT on groups/:id
                      >
                        Edit Group
                      </li>
                      <li
                        className="px-3 py-1 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                        onClick={() => {
                          setGroupToDelete(g);
                          setShowModal(true);
                          setOpenDropdown(null);
                        }}
                      >
                        Delete Group
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌫️ Modal Backdrop + Glassy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 transition-opacity duration-300">
          <div className="bg-white/80 text-[#4B0000] w-[90%] max-w-md rounded-2xl p-8 shadow-2xl animate-fadeIn backdrop-blur-md">
            <h2 className="text-3xl font-semibold text-[#9D0208] mb-2 text-center">
              Delete this group?
            </h2>
            <p className="text-xl mb-5 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#E85D04]">{groupToDelete?.name}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-800 hover:bg-gray-100 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E85D04] via-[#9D0208] to-[#4B0000] text-white hover:from-[#f06a1a] hover:to-[#3a0000] transition-all"
                onClick={async () => {
                  const res = await deleteGroup(groupToDelete._id);
                  if (res.message) {
                    console.log(res.message);
                    navigate("/groups"); 
                  } else {
                    console.log(res.error);
                  }
                  setShowModal(false); 
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
