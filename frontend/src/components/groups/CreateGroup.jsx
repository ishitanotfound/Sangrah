import { useNavigate } from "react-router-dom"
import { createGroup } from "../../api/groupAPI";
import { useForm } from "react-hook-form";

export default function CreateGroup() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState:{errors}} = useForm();

    const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('memberUsernames', data.memberUsernames); 

  if (data.newGroupPhoto?.[0]) {
    formData.append('groupPic', data.newGroupPhoto[0]); 
  }

  const res = await createGroup(formData);  

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

            {/* NEW-GROUP TITLE ----------------------------------------*/}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                Create New Group
            </p>

            {/* NEW-GROUP FORM -----------------------------------------*/}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5">

                {/* GROUP-NAME */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" {...register('name', {required: {value:true, message: "Please enter a group name!"}})} id="name" placeholder="Enter new group name" />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                </div>
                
                {/* USERNAMES, dekhna array mein hi jana chahiye */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPeople" className="w-full sm:w-1/3 text-right">Members</label>
                    <input type="text" {...register('memberUsernames', {required:{value:true, message: "Please provide the members' usernames!"}})} id="newGroupMembers" placeholder="Enter group members' usernames" />
                    {errors.memberUsernames && <p className="text-red-600">{errors.memberUsernames.message}</p>}
                </div>
                
                {/* GROUP-PICTURE */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newGroupPhoto" className="w-full sm:w-1/3 text-right">Group's Photo</label>
                    <input type="file" accept="image/*" {...register('newGroupPhoto')} id="newGroupPhoto" placeholder="Insert new group's photo" />
                </div>
                
                {/* CREATE-GROUP BUTTON */}
                <button className="hero-button">Create New Group</button>
            </form>

        </div>        
    </section>
  )
}
