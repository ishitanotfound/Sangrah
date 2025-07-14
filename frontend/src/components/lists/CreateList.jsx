import { useNavigate } from "react-router-dom"
import { createList } from "../../api/listAPI";
import { useForm } from "react-hook-form"; 

export default function CreateList() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (formData) => {
      const res = await createList(formData);
      if ( res.savedList ) {
        console.log(res.message);
        navigate('/lists', { replace: true })
      } else {
        console.log(res.error);
      }
    }
  return (
    <section id='createList' className="flex-center">
        <div className="w-[85%] sm:w-[45%] m-auto bg-[#fff]/30 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6 absolute top-43 md:top-43">

            {/* CREATE-NEW-LIST TITLE-----------------------------------------------------*/}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                Create New List
            </p>

            {/* CREATE-NEW-LIST FORM----------------------------------------------------- */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-full">

                {/* LIST-NAME */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newListName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" {...register('name')} id="newListName" placeholder="Enter new list name" />
                </div>

                {/* FROM-DATE, extract onlt date part */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="fromDate" className="w-full sm:w-1/3 text-right">From</label>
                    <input type="date" {...register('fromDate')} id="fromDate" placeholder="Choose start date"/>
                </div>

                {/* TO-DATE, extract onlt date part */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="toDate" className="w-full sm:w-1/3 text-right">To</label>
                    <input type="date" {...register('toDate')} id="toDate" placeholder="Choose end date"/>
                </div>

                {/* SUBMIT BUTTON */}
                <button className="hero-button">Create New List</button>
            </form>

        </div>        
    </section>
  )
}
