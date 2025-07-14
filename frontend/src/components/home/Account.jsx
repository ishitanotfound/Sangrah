import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchProfile } from '../../api/userAPI';
import { updateProfile } from '../../api/userAPI';
import { deleteProfile } from '../../api/userAPI';

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { register, handleSubmit, formState:{isSubmitting}} = useForm();

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchProfile();
      if (res.user) {
        setUser(res.user);
        console.log(res.message);
      } else {
        console.log("Error fetching profile:", res.error);
      }
    };
    getProfile();
  }, []);

  const delay = async (d) => {
    return new promise ((resolve, reject) => {
      setTimeout(()=>{
        resolve();
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    delay(5);

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('password', data.password);

    if (data.profilePic && data.profilePic[0]) {
      formData.append('profilePic', data.profilePic[0]);
    }

    const res = await updateProfile(formData);
    if (res.user) {
      console.log(res.message);
      const updated = await fetchProfile();
      setUser(updated.user);
    } else {
      console.log('Error in updating account!', res.error);
    }
  };

  return (
    <section id="createList" className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white/30 p-6 sm:p-10 rounded-3xl shadow-xl backdrop-blur-md flex flex-col items-center gap-6 mt-25 sm:mt-15 mb-4 sm:mb-5">

        {/* ACCOUNT TITLE */}
        <p className="text-4xl md:text-5xl text-gradient hover:cursor-default font-cinzel text-center">
          ACCOUNT
        </p>

        {/* USER DP */}
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="User DP"
            className="w-30 sm:w-35 rounded-full object-cover border-2 border-white/20 shadow-md"
          />
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">

          {/* NAME */}
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="name" className="w-full sm:w-1/3 text-right">Name</label>
            <input type="text" {...register("name")} id="name" placeholder={user.name || "Current name"} />
          </div>

          {/* EMAIL */}
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="email" className="w-full sm:w-1/3 text-right">Email</label>
            <input type="email" {...register("email")} id="email" placeholder={user.email || "Current email"} />
          </div>

          {/* USERNAME */}
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="username" className="w-full sm:w-1/3 text-right">Username</label>
            <input type="text" {...register("username")} id="username" placeholder={user.username || "Current username"} />
          </div>

          {/* PASSWORD */}
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="password" className="w-full sm:w-1/3 text-right">Password</label>
            <input type="password" {...register("password")} id="password" placeholder={user.password || "Current password"} />
          </div>

          {/* PROFILE PIC */}
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="profilePic" className="w-full sm:w-1/3 text-right">Upload Picture</label>
            <input type="file" {...register("profilePic")} id="profilePic" className='cursor-pointer'/>
          </div>
          
          {isSubmitting && <p className='text-green-700 text-center'>Updating the Account...</p>}

          {/* UPDATE BUTTON */}
          <button disabled={isSubmitting} className="w-full py-3 font-cinzel text-white rounded-full bg-gradient-to-r from-[#f6b36a] via-[#FF7601] to-[#d84b00] hover:from-[#f39553] hover:to-[#c74000] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer">
            Update Account
          </button>

          {/* DELETE BUTTON */}
          <button
            disabled={isSubmitting}
            type="button"
            className="w-full py-3 font-cinzel text-white rounded-full bg-gradient-to-r from-[#E85D04] via-[#C7360D] to-[#9D0208] hover:from-[#f06a1a] hover:to-[#7A0106] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Delete Account
          </button>
        </form>
      </div>


      {/* DELETE-MODAL =======================================================================*/}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 transition-opacity duration-300">
          <div className="bg-white/80 text-[#4B0000] w-[90%] max-w-md rounded-2xl p-6 shadow-2xl animate-fadeIn backdrop-blur-md">
            
            {/* MODAL-TITLE */}
            <h2 className="text-2xl font-bold text-center text-[#9D0208] mb-2">
              Delete your account?
            </h2>

            {/* MODAL-DESC */}
            <p className="text-base mb-5">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>

            {/* MODAL-BUTTONS */}
            <div className="flex justify-end gap-3 text-center">
              
              {/* CANCEL */}
              <button
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              
              {/* DELETE */}
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E85D04] via-[#9D0208] to-[#4B0000] text-white hover:from-[#f06a1a] hover:to-[#3a0000] transition-all cursor-pointer"
                onClick={ async () => {
                  const res = await deleteProfile();
                    if (res.message) {
                      console.log(res.message);
                      localStorage.removeItem("token"); 
                      navigate("/"); 
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
