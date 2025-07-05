import { useNavigate } from "react-router-dom"


export default function CreateList() {
    const navigate = useNavigate();
  return (
    <section id='createList' className="flex-center">
        <div className="w-[85%] sm:w-[45%] m-auto bg-[#fff]/30 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-5 absolute top-43 md:top-43">

            {/* New List Title */}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                CreateNew List
            </p>

            {/* form */}
            <form action="#" className="flex flex-col items-center gap-5">
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newListName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" name="newListName" id="newListName" placeholder="Enter new list name" />
                </div>

                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="fromDate" className="w-full sm:w-1/3 text-right">Start Date</label>
                    <input type="date" name="fromDate" id="fromDate" placeholder="Choose start date"/>
                </div>

                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="toDate" className="w-full sm:w-1/3 text-right">End Date</label>
                    <input type="date" name="toDate" id="toDate" placeholder="Choose end date"/>
                </div>

                <button className="hero-button" onClick={()=>navigate('/listShow')}>Create New List</button>
            </form>
        </div>        
    </section>
  )
}
