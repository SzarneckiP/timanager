import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { useFormStatus } from "react-dom"


interface DeleteAlertProps {
    className?: string,
    children?: React.ReactNode
    desc: string,
    onDelete?: () => void,
    disabled: boolean,
}


const DeleteAlert = ({ desc, onDelete, disabled, children, className }: DeleteAlertProps) => {
    const { pending } = useFormStatus()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="text-rose-500 hover:text-rose-500 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Usuń {desc}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Jesteś pewien, że chcesz usunąć?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tej akcji nie da się cofnąć. To spowoduje trwałe usunięcie elementu i jego zawartości z serwerów.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={disabled || pending}
                    >
                        Wróć
                    </AlertDialogCancel>
                    {children ? (
                        <AlertDialogAction
                            disabled={disabled || pending}
                            type='submit'
                            className={cn(buttonVariants({ variant: 'outline' }), className ? className : 'text-rose-500 hover:text-rose-700')}
                        >
                            {children}
                        </AlertDialogAction>
                    ) : (
                        <AlertDialogAction
                            disabled={disabled || pending}
                            onClick={onDelete}
                            className={cn(buttonVariants({ variant: 'outline' }), className ? className : 'text-rose-500 hover:text-rose-700')}
                        >
                            Usuń
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAlert