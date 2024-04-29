'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import Image from "next/image"
import { Button } from "../ui/button"
import { useAction } from "@/hooks/use-action"
import { stripeRedirect } from "@/actions/stripe-redirect"
import { toastError } from "@/constants/toaster"

export const ProModal = () => {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data
        },
        onError: (error) => {
            toastError(error)
        }
    })

    const onClick = () => {
        execute({})
    }

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src='/lion.svg'
                        alt="lion"
                        fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl text-center">
                        Zaktualizuj do Task and Info Manager Pro już dziś!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Odkryj to co najlepsze z TIManager.
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Nie limitowane tablice </li>
                            <li>Zaawansowana checklist </li>
                            <li>Administracja i zaawansowane ustawienia</li>
                            <li>I wiecej!</li>
                        </ul>
                    </div>
                    <Button
                        disabled
                        onClick={onClick}
                        className="w-full"
                        variant={'primary'}
                    >
                        Zaktualizuj plan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

