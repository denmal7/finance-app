import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again")
        }
    };
    

    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
            <form
               onSubmit={handleSubmit} 
               className="bg-white shadow-md rounded p-6 w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                
                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}
           
                <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input 
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input 
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded bg-blue-600 text-white font-medium"
                >
                    Sign in
                </button>

                <div className="mt-4">
                    <p className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-green-600 font-medium hover:underline">
                          Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
};

export default Login;