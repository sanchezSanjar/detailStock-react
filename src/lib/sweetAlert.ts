import Swal from "sweetalert2";

export const sweetErrorHandling = async (err: unknown) => {
    const message = err instanceof Error ? err.message : "Something went wrong!";
    await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
};

export const sweetTopSuccessAlert = async (message: string, duration = 1500) => {
    await Swal.fire({
        position: "top",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: duration,
    });
};

export const sweetTopSmallSuccessAlert = async (message: string, duration = 1500) => {
    await Swal.fire({
        position: "top",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
    });
};