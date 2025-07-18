import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { api } from "../../api/api";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

export default function Register() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                username,
                email,
                password
            }, { withCredentials: true });

            const token = Cookies.get("token");

            if (token) {
                localStorage.setItem("token", token);
                auth(token);

                Swal.fire({
                    title: 'Success!',
                    text: 'Register success',
                    icon: 'success',
                    confirmButtonText: 'OK'
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
                    text: 'Login failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md p-6 rounded shadow space-y-4"
            >
                <h1 className="text-4xl font-bold text-green-500">Circle</h1>
                <h2 className="text-lg text-white">Register to Circle</h2>

                <div>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Insert Username*"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-500 rounded p-5 text-gray-300"
                    />
                </div>
                <div>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Insert Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-3xl">
                    Register
                </Button>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-green-500">Login</a>
                </p>
            </form>
        </div>
    );
}
