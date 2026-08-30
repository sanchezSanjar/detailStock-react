import Swal from "sweetalert2";

export const sweetErrorHandling = async (err: unknown) => {
    const message = err instanceof Error ? err.message : "Something went wrong!";
    await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
};