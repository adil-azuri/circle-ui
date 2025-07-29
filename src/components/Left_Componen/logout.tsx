import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { Button } from "../ui/button";

export function Logout() {
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
        <div className="flex items-center">
            <svg className="size-8" onClick={handleLogout}
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" stroke="#bababa" stroke-linecap="round"></path> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#bababa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <Button onClick={handleLogout} className="text-xl">
                Logout
            </Button>
        </div>
    )
}