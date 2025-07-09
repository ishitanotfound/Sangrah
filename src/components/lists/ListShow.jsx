export default function ListShow() {
  return (
    <section className="relative top-24 min-h-screen flex flex-col items-center gap-6 px-5 sm:px-12 md:px-20 xl:px-32 ">
      {/* List Name */}
      <p className="text-4xl text-gradient md:text-5xl text-[#FF7601] hover:cursor-default font-cinzel">
        List Name
      </p>

      {/* Gita-quote */}
      <p className="font-cinzel text-lg sm:text-xl text-[#9D0208] text-center"><i> “There is nothing lost or wasted in this life. Even a little progress on the path of truth can protect you from great fear.”</i></p>

      {/* Add New Task Section */}
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch">
        {/* input */}
        <input
          className="flex-1 px-4 py-2 border-b border-neutral-400 bg-transparent focus:outline-none focus:border-[#FF7601] transition-all text-base sm:text-lg"
          type="text"
          name="newTask"
          id="newTask"
          placeholder="Enter new task"
        />
        {/* Add Button */}
        <button className="hero-button self-center sm:self-auto">
          Add
        </button>
      </div>

      {/* Box of Tasks */}
      <div className="tasks w-full">
        <ul className="w-full flex flex-col gap-1">
          {/* One Task */}
          <li className="w-full bg-[#fff]/30 px-4 py-4 sm:px-8 sm:py-5 rounded-3xl shadow-lg flex items-center justify-between gap-4 text-base text-md sm:text-lg">
            
            <div className="flex gap-2">
              {/* Checkbox */}
              <input
              className="checkbox scale-150 accent-gray-500 hover:cursor-pointer peer outline-none focus:outline-none" type="checkbox" id="checkbox1" />
              {/* Label */}
              <label
                htmlFor="checkbox1"
                className="peer-checked:line-through peer-checked:opacity-60 transition-all"
              >
                My task
              </label>
            </div>
            
            {/* delete button */}
            <span className="material-symbols-outlined hover:cursor-pointer">remove</span>
          </li>

          {/* One Task */}
          <li className="w-full bg-[#fff]/30 px-4 py-4 sm:px-8 sm:py-5 rounded-3xl shadow-lg flex items-center justify-between gap-4 text-base text-md sm:text-lg">
            
            <div className="flex gap-2">
              {/* Checkbox */}
              <input
              className="checkbox scale-150 accent-gray-500 hover:cursor-pointer peer outline-none focus:outline-none" type="checkbox" id="checkbox1" />
              {/* Label */}
              <label
                htmlFor="checkbox1"
                className="peer-checked:line-through peer-checked:opacity-60 transition-all"
              >
                My task
              </label>
            </div>
            
            {/* delete button */}
            <span className="material-symbols-outlined hover:cursor-pointer">remove</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
