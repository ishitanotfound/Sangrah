import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchGLists } from "../../api/groupAPI";
import { deleteList } from "../../api/listAPI";
import { useForm } from "react-hook-form";

export default function GroupView() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [listToDelete, setListToDelete] = useState(null);
  const [allGLists, setAllGLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef([]);
  const { register, handleSubmit, formState:{errors} } = useForm();
  const { id } = useParams();
  

  useEffect(() => {
      const getGLists = async () => {
        const res = await fetchGLists(id);
        if (res.groupList) {
          setAllGLists(res.groupList);
          console.log(res.message);
        } else {
          console.log("Error fetching group lists:", res.error);
        }
      };
      getGLists();
    }, []);

  const handleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

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
    <section className="all-lists-in-group relative min-h-screen flex flex-col items-start px-4 sm:px-10">
      
      {/* CREATE-NEW-LIST BUTTON -------------------------------------*/}
      <button
        className="hero-button absolute top-25 md:top-18 right-20"
        onClick={() => navigate(`/createGList/${id}`)}
      >
        + Create New List
      </button>

      
      <div className="main-content mt-37 sm:mt-24 w-full">

        {/* ALL-LISTS TITLE */}
        <p className="text-xl text-[#FF7601] hover:cursor-default pl-1 sm:pl-10 mt-2">
          All lists
        </p>

        {/* DISPLATING ALL GROUPS */}
        <div className="all-lists-box w-full pt-4 sm:px-10 flex flex-wrap justify-center sm:justify-start gap-4">
          {allGLists.map((l,i) => (
            <div
              key={i}   //index of lists 
              className="w-full sm:w-auto cursor-pointer"
              ref={(el) => (dropdownRef.current[i] = el)}
              onClick={() => navigate(`/listShow/${l._id}`)} // to individual list, GET on /lists/:id
            >
              <div className="card bg-[#fff]/30 rounded-3xl shadow-sm p-5 sm:p-5 w-full sm:w-85 max-w-xs">
                <div className="card-body flex flex-col gap-1">
                  <div className="flex justify-between relative">
                    
                    <div>
                      {/* list.name */}
                      <h2 className="card-title text-xl sm:text-2xl text-gray-700 font-semibold">
                        {l.name}
                      </h2>
                      {/* list.fromDAte */}
                      <h3 className="text-sm sm:text-base"><b>From: </b>{l.fromDate?.slice(0, 10)}</h3> 
                      {/* list.toDate */}
                      <h3 className="text-sm sm:text-base"><b>To: </b>{l.toDate?.slice(0, 10)}</h3>
                      {/* list.craetedBy */}
                      <h3 className="text-sm sm:text-base"><b>Created by: </b>{l.createdBy?.username}</h3>
                    </div>

                    <button
                      className="text-gray-700 hover:text-[#FF7601] text-xl z-20"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDropdown(i);
                      }}
                    >
                      <span className="material-symbols-outlined relative bottom-8 cursor-pointer">
                        more_vert
                      </span>
                    </button>

                    {openDropdown === i && (
                      <ul
                        className="absolute right-0 top-10 bg-white text-sm z-30 shadow-md rounded-lg w-44 p-2 space-y-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <li
                          className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => navigate(`/updateList/${l._id}`)}
                        >
                          {/* PUT on lists/:id */}
                          Edit List
                        </li>
                        <li
                          className="px-3 py-1 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                          onClick={() => {
                            setListToDelete(l);
                            setShowModal(true);
                            setOpenDropdown(null);
                          }}
                        >
                          Delete List
                        </li>
                      </ul>
                    )}
                  </div>

                  <progress
                    className="progress progress-success w-full"
                    value={
                      l.tasks && l.tasks.length > 0
                        ? (l.tasks.filter(t => t.completed).length / l.tasks.length) * 100
                        : 0
                    }
                    max="100"
                  />

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌫️ Modal Backdrop + Glassy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 transition-opacity duration-300">
          <div className="bg-white/80 text-[#4B0000] w-[90%] max-w-md rounded-2xl p-8 shadow-2xl animate-fadeIn backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-[#9D0208] mb-2 text-center">
              Delete this list?
            </h2>
            <p className="text-xl mb-5 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#E85D04]">{listToDelete?.name}</span>?
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
                  const res = await deleteList(listToDelete._id);
                  if (res.message) {
                    console.log(res.message);
                    // Refresh the list of group lists
                    const updated = await fetchGLists(id);
                    if (updated.groupList) setAllGLists(updated.groupList);
                  } else {
                    console.log("Delete error:", res.error);
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
