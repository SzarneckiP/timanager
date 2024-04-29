'use client'

import { stripeRedirect } from "@/actions/stripe-redirect"
import { Button } from "@/components/ui/button"
import { toastError } from "@/constants/toaster"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"

interface SubscriptionButtonProps {
    isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess(data) {
            window.location.href = data
        },
        onError(error) {
            toastError(error)
        },
    })

    const onClick = () => {
        if (isPro) {
            execute({})
        } else {
            proModal.onOpen()
        }
    }

    return (
        <Button
            variant={'primary'}
            disabled
            onClick={onClick}
        >
            {isPro ? 'Zarządzaj subskrypcją' : 'Kup PRO'}
        </Button>
    )
}