import { useNavigate } from "react-router-dom"


export default function CreateGroup() {
    const navigate = useNavigate();
  return (
    <section id='createList' className="flex-center">
        <div className="w-[85%] sm:w-[45%] m-auto bg-[#fff]/30 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6 absolute top-43 md:top-43">

            {/* New List Title */}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                Create New Group
            </p>

            {/* form */}
            <form action="#" className="flex flex-col items-center gap-5">
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" name="newGroupName" id="newGroupName" placeholder="Enter new group name" />
                </div>
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPeople" className="w-full sm:w-1/3 text-right">People</label>
                    <input type="text" name="newGroupPeople" id="newGroupPeople" placeholder="Enter peoples' usernames" />
                </div>
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPhoto" className="w-full sm:w-1/3 text-right">Group's Photo</label>
                    <input type="file" accept="image/*" name="newGroupPhoto" id="newGroupPhoto" placeholder="Insert new group's photo" />
                </div>
                <button className="hero-button" onClick={()=>navigate('/groups')}>Create New Group</button>
            </form>
        </div>        
    </section>
  )
}
