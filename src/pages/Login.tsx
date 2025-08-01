import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../api/api";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

export default function Login() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        console.log("handleLogin called");
        e.preventDefault();

        try {
            await api.post("/auth/login", {
                usernameOrEmail,
                password
            }, { withCredentials: true });

            const token = Cookies.get("token");

            if (token) {
                localStorage.setItem("token", token);
                auth(token);

                Swal.fire({
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    timer: 1500
                }).then(() => {
                    navigate("/home");
                });
            }
        } catch (error: any) {
            console.error("Login error:", error);

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid username or password.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Login failed. Invalid username or password',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md p-6 rounded shadow space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-500">Circle</h1>
                <h2 className="text-lg text-white">Login to Circle</h2>

                <div>
                    <Input
                        id="usernameOrEmail"
                        type="text"
                        placeholder="Insert Email/Username*"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                        className="border border-gray-500 rounded p-5 text-gray-300"
                    />
                </div>

                <div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Insert Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-500 rounded p-5 text-gray-300"
                    />
                </div>
                <p className="text-sm text-end text-gray-200 mt-4">
                    <a href="/reset-password" className="text-green-500">Forgot Password?</a>
                </p>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-3xl">
                    Login
                </Button>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Not have an account? <a href="/register" className="text-green-500">Create an account</a>
                </p>
            </form>
        </div>
    );
}
