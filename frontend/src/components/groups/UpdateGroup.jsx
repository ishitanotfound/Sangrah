import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateGroup } from "../../api/groupAPI";

export default function UpdateGroup() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { id } = useParams();

    const onSubmit = async (data) => {
        const res = await updateGroup(id, data);
        if (res.group) {
            console.log(res.message);
            navigate('/groups');
        } else {
            console.log(res.error);
        }
    }

  return (
    <section id='createList' className="flex-center">
        <div className="w-[85%] sm:w-[45%] m-auto bg-[#fff]/30 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6 absolute top-43 md:top-43">

            {/* UPDATE-GROUP TITLE -----------------------------------*/}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                Update Group
            </p>

            {/* UPDATE-GROUP FORM ------------------------------------*/}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5">
                
                {/* GROUP-NAME */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" {...register('name')} id="newGroupName" placeholder="Enter new group name" />
                </div>
                
                {/* USERNAMES, send as array onlyyy!!! */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPeople" className="w-full sm:w-1/3 text-right">People</label>
                    <input type="text" {...register('memberUsernames')} id="newGroupPeople" placeholder="Enter peoples' usernames" />
                </div>
                
                {/* GROUP-PICTURE */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPhoto" className="w-full sm:w-1/3 text-right">Group's Photo</label>
                    <input type="file" accept="image/*" {...register('groupPic')} id="newGroupPhoto" placeholder="Insert new group's photo" />
                </div>
                
                {/* UPDATE-GROUP BUTTON */}
                <button className="hero-button">Update</button>
            </form>
            
        </div>        
    </section>
  )
}
