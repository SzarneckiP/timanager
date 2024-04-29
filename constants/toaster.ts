import { toast } from "sonner";

export const toastSuccess = (message: string) => {
    toast.success(message, {
        style: {
            background: '#ecfccb',
            border: 'none',
        },
    })
}

export const toastError = (message: string) => {
    toast.error(message, {
        style: {
            background: '#fca5a5',
            border: 'none',
        },
    })
}

export const toastLoading = (message: string) => {
    toast.loading(message)
}