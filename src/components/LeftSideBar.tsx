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
        <div className=" w-1/4 text-white p-7">
            <div className="min-h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-4xl text-green-500 font-bold mb-6">circle</h2>
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
                    <button className="mt-5 bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 w-full rounded-4xl">Create Post</button>
                </div>
                <div className="mt-10 flex items-center">
                    <Button onClick={handleLogout} className=" bg-red-500 hover:bg-gray-700 rounded-full">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SidebarLeft;
