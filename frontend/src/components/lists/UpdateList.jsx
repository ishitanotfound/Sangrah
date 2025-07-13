import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"; 
import { updateList } from "../../api/listAPI";


export default function UpdateList() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (formData) => {
        const res = await updateList(id, formData);
        if (res.list) {
            console.log(res.message);
            if(res.list.group){
                return navigate(`/groupView/${res.list.group}`);
            }
            navigate('/lists');
        } else {
            console.log(res.error);
        }
    }
    
  return (
    <section id='createList' className="flex-center">
        <div className="w-[85%] sm:w-[45%] m-auto bg-[#fff]/30 p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6 absolute top-35 md:top-40">

            {/* UPDATE-LIST TITLE ----------------------------------------*/}
            <p className="text-4xl sm:text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel">
                Update List
            </p>

            {/* INTRUCTION SUB-TITLE ------------------------------------=*/}
            <p className="text-center">( Change required options only! Leave rest as it is.  )</p>

            {/* UPDATE FROM ----------------------------------------------*/}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5">

                {/* LIST-NAME */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="newListName" className="w-full sm:w-1/3 text-right">Name</label>
                    <input type="text" {...register('name')} id="name" placeholder="Enter new list name" />
                </div>

                {/* FROM-DATE */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="fromDate" className="w-full sm:w-1/3 text-right">From</label>
                    <input type="date" {...register('fromDate')} id="fromDate" placeholder="Choose start date"/>
                </div>

                {/* TO-DATE */}
                <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
                    <label htmlFor="toDate" className="w-full sm:w-1/3 text-right">To</label>
                    <input type="date" {...register('toDate')} id="toDate" placeholder="Choose end date"/>
                </div>

                {/* SUBMIT-UPDATE BUTTON */}
                <button className="hero-button"> Update </button>
            </form>
            
        </div>        
    </section>
  )
}
