import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <section id="LoginSign" className="relative top-0 overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="form-box w-full max-w-xl bg-[#fff]/30  p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6">
        
        <h1 className="font-cinzel text-center text-4xl font-semibold text-gradient">Sign Up</h1>
        
        <form action="#" className="w-full space-y-5">
          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="name" className="w-full sm:w-1/3 text-right">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter name" />
          </div>

          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="email" className="w-full sm:w-1/3 text-right">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter email" />
          </div>

          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="name" className="w-full sm:w-1/3 text-right">Username</label>
            <input type="text" name="username" id="username" placeholder="Enter username" />
          </div>

          <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="password" className="w-full sm:w-1/3 text-right">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter password" />
          </div>

          <button className="w-full py-3 font-cinzel text-white rounded-full bg-gradient-to-r from-[#f6b36a] via-[#FF7601] to-[#d84b00] hover:from-[#f39553] hover:to-[#c74000] transition-all duration-300 shadow-md hover:shadow-xl">
            Submit
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF7601] font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
