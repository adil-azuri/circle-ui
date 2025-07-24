// handleThread.ts
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { api } from "@/api/api";

export const handleThread = async (
    content: string,
    photo: File | null,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setPhoto: React.Dispatch<React.SetStateAction<File | null>>,
    setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>> // Optional for dialog
) => {
    const token = Cookies.get("token");

    if (!token) {
        setErrorMsg("You must be logged in to Post Thread.");
        return;
    }

    const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to post this thread?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Post it!'
    });

    if (!confirmResult.isConfirmed) {
        return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (photo) {
        formData.append("photo", photo);
    }

    let timerInterval: NodeJS.Timeout | undefined;
    Swal.fire({
        title: 'Posting your thread...',
        html: 'Please wait...',
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
    });

    try {
        await api.post("/threads/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });

        Swal.close();

        Swal.fire({
            text: 'You have successfully added a post.',
            icon: 'success',
            timer: 2000
        });
        setContent("");
        setPhoto(null);
        setPhotoPreview(null);
        setErrorMsg("");
        if (setIsDialogOpen) {
            setIsDialogOpen(false); // Close dialog if it's open
        }

    } catch (error: any) {
        Swal.close();

        console.error("Post thread error:", error);

        if (error.response && error.response.status === 401) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid input for thread or unauthorized.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Post failed. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    } finally {
        setIsLoading(false);
    }
};
