import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { deleteList, fetchLists } from "../../api/listAPI";

export default function Lists() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);    // INDEX OF THE LIST WHOSE DROPDOWN IS TO BE OPENED!
  const [listToDelete, setListToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef([]);
  const [ listItems, setListItems ] = useState([]);

  const handleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current[openDropdown] &&                       // AGAR DROPDOWN OPEN H
        !dropdownRef.current[openDropdown].contains(event.target)  // AUR CLICKED-EVENT DOESN'T COME UNDER DROPDOWN
      ) {
        setOpenDropdown(null);  // TOH DROPDOWN BAND KR DO
      }
    };
    document.addEventListener("mousedown", handleClickOutside);  // YA AGAR DROPDOWN KE BAHAR MOUSE SCROLL KIYA TOH
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // ARRAY OF LIST-NAMES
  useEffect(() => {
      const getLists = async () => {
        const res = await fetchLists();
        if (res.lists) {
          setListItems(res.lists);
          console.log(res.message);
        } else {
          console.log("Error fetching list:", res.error);
        }
      };
      getLists();
    }, []);

  return (
    <section id="lists-main-layout" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* CREATE-LIST BUTTON ----------------------------------------------------------*/}
      <button
        className="hero-button absolute top-25 md:top-18 right-20"
        onClick={() => navigate("/createList")}
      >
        + Create new List
      </button>

      {/* LIST-BOX----------------------------------------------------------------------*/}
      <div className="w-[90%] bg-[#fff]/30 p-6 sm:p-12 rounded-3xl shadow-lg flex flex-col items-start gap-4 absolute top-43 md:top-35">
        
        {/* ALL-LISTS TITLE*/}
        <p className="text-xl text-[#FF7601] hover:cursor-default">All lists</p>

        {/* DISPLAYING ALL-LISTS */}
        <ul className="list-group flex flex-col gap-2 text-lg w-full">
          
          {/* MAPPING OF LIST-ARRAY================================================*/}
          { ( listItems.length === 0) ? <p className="text-center text-gray-600">No Lists to Show!</p> : null }
          {listItems.map((item, index) => (
            
            <li
              key={index} // index of each list from array
              className="flex justify-between items-center relative py-2 px-1"
              ref={(el) => (dropdownRef.current[index] = el)}
            >
              <Link
                to={`/listShow/${item._id}`} // what list to show
                className="flex-1 border-b border-neutral-400 hover:border-[#FF7601] transition-all py-1"
              >
                {item.name}  
              </Link>

              {/* Dropdown */}
              <div className="relative">
                <button
                  className="text-xl text-gray-700 hover:text-[#FF7601]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDropdown(index);
                  }}
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>

                {openDropdown === index && (
                  <ul className="absolute right-0 top-8 bg-white text-sm z-10 shadow-md rounded-lg w-44 p-2 space-y-1">
                    <li className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>navigate(`/updateList/${item._id}`)}>Edit</li>
                    <li
                      className="px-3 py-1 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                      onClick={() => {
                        setListToDelete(item);    // konsi list delete krni h, send id
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* DELETE-LIST MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 transition-opacity duration-300">
          <div className="bg-white/80 text-[#4B0000] w-[90%] max-w-md rounded-2xl p-8 shadow-2xl animate-fadeIn backdrop-blur-md">
            <h2 className="text-3xl font-semibold text-[#9D0208] mb-2 text-center">
              Delete this list?
            </h2>
            <p className="text-xl mb-5 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#E85D04]">{listToDelete.name}</span>?
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
                      navigate("/lists"); 
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
