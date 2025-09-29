import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== password2) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register(name, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
              onSubmit={handleSubmit}
              className="w-80 bg-white p-6 rounded-xl shadow-md"
            >
                <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">Full name</label>
                    <input 
                       type="text"
                       name="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Your name"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-green-600 focus:outline-none"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                       type="email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="you@example.com"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-green-600 focus:outline-none"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input 
                       type="password"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-green-600 focus:outline-none"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Confirm password</label>
                    <input 
                       type="password"
                       name="password2"
                       value={password2}
                       onChange={(e) => setPassword2(e.target.value)}
                       placeholder="Password"
                       className="w-full rounded-md border px-3 py-2 mb-3 focus:ring focus:ring-green-600 focus:outline-none"

                    />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded bg-green-600 text-white font-medium"
                >
                    Create account
                </button>

                <div className="mt-4">
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 font-medium hover:underline">
                           Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
};

export default Register;