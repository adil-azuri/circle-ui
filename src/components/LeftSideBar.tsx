import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import Swal from 'sweetalert2';

function SidebarLeft() {
    const { logout } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire(
                    'Logged out!',
                    'You have been logged out.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="bg-gray-900 text-green-500 w-1/4 h-screen p-5">
            <div>
                <h2 className="text-4xl font-bold mb-6">circle</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        Home
                    </li>
                    <li className="flex items-center">
                        Search
                    </li>
                    <li className="flex items-center">
                        Follows
                    </li>
                    <li className="flex items-center">
                        Profile
                    </li>
                </ul>
                <button className="mt-5 bg-green-500 text-white p-2 w-full rounded-4xl">Create Post</button>
            </div>
            <div className="mt-10 flex items-center">
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-800">
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default SidebarLeft;
