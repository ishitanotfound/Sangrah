  import { useNavigate, Link } from "react-router-dom";
  import { signUpUser } from "../../api/userAPI";
  import { useState } from "react";

  export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
      e.preventDefault();
      const res = await signUpUser({ name, username, email, password }); //response maang rhe h

      if (res.token) { // response mein humme token mil rha h
        localStorage.setItem("token", res.token); // jo token mila h usse set kr rhe h
        console.log(res.message);
        navigate("/lists"); 
      } else {
        console.log("Signup error", res.error);
      }
    };

    return (
      <section id="LoginSign" className="relative top-0 overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="form-box w-full max-w-xl bg-[#fff]/30  p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center gap-6">
          
          {/* SIGN UP TITLE ----------------------------------*/}
          <h1 className="font-cinzel text-center text-4xl font-semibold text-gradient">Sign Up</h1>
          
          {/* SIGN UP FORM----------------------------------- */}
          <form className="w-full space-y-5" onSubmit={handleSignup}>

            {/* NAME */}
            <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <label htmlFor="name" className="w-full sm:w-1/3 text-right">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Enter name" />
            </div>

            {/* EMAIL */}
            <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <label htmlFor="email" className="w-full sm:w-1/3 text-right">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Enter email" />
            </div>

            {/* USERNAME */}
            <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <label htmlFor="name" className="w-full sm:w-1/3 text-right">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="Enter username" />
            </div>

            {/* PASSWORD */}
            <div className="inpOp flex flex-col sm:flex-row sm:items-center sm:gap-5">
              <label htmlFor="password" className="w-full sm:w-1/3 text-right">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="Enter password" />
            </div>

            {/* SUBMIT BUTTON */}
            <button className="w-full py-3 font-cinzel text-white rounded-full bg-gradient-to-r from-[#f6b36a] via-[#FF7601] to-[#d84b00] hover:from-[#f39553] hover:to-[#c74000] transition-all duration-300 shadow-md hover:shadow-xl">
              Submit
            </button>
          </form>

          {/* LOGIN INSTEAD -------------------------------------------*/}
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
