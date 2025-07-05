import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Lists() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef([]);

  const handleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // 🧠 Close dropdown on click outside
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

  const listItems = [
    "An item",
    "Another item",
    "Second item",
    "Third item",
    "Fourth item",
    "Fifth item",
  ];

  return (
    <section id="lists-main-layout" className="relative min-h-screen flex flex-col items-center justify-center">
      
      {/* Create New List button */}      
      <button
        className="hero-button absolute top-25 md:top-18 right-20"
        onClick={() => navigate("/createList")}
      >
        + Create new List
      </button>      

      {/* List Box */}
      <div className="w-[90%] bg-[#fff]/30 p-6 sm:p-12 rounded-3xl shadow-lg flex flex-col items-start gap-4 absolute top-43 md:top-35">
        <p className="text-xl text-[#FF7601] hover:cursor-default">All lists</p>

        <ul className="list-group flex flex-col gap-2 text-lg w-full">
          {listItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center relative py-2 px-1"
              ref={(el) => (dropdownRef.current[index] = el)}
            >
              {/* Link to list */}
              <Link
                to="/listShow"
                className="flex-1 border-b border-neutral-400 hover:border-[#FF7601] transition-all py-1"
              >
                {item}
              </Link>

              {/* ⋮ Dropdown Toggle */}
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

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <ul className="absolute right-0 top-8 bg-white text-sm z-10 shadow-md rounded-lg w-44 p-2 space-y-1">
                    <li className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer">
                      Rename
                    </li>
                    <li className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer">
                      Remove from Group
                    </li>
                    <li className="px-3 py-1 text-red-600 hover:bg-red-100 rounded cursor-pointer">
                      Delete
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
