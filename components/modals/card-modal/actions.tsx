'use client'
import { useAction } from "@/hooks/use-action"
import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { Copy, Trash } from "lucide-react"
import { toastError, toastSuccess } from "@/constants/toaster"
import { useCardModal } from "@/hooks/use-card-modal"
import DeleteAlert from "@/app/(platform)/(dashboard)/board/[boardId]/_components/delete-alert"

interface ActionsProps {
    data: CardWithList,
}

export const Actions = ({ data }: ActionsProps) => {

    const params = useParams()
    const cardModal = useCardModal()

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess(data) {
            toastSuccess(`Karta "${data.title}" skopiowana.`)
            cardModal.onClose()
        },
        onError(error) {
            toastError(error)
        },
    })

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess(data) {
            toastSuccess(`Karta "${data.title}" usunięta.`)
            cardModal.onClose()
        },
        onError(error) {
            toastError(error)
        },
    })

    const onCopy = () => {
        const boardId = params.boardId as string
        executeCopyCard({
            id: data.id,
            boardId,
        })
    }

    const onDelete = () => {
        const boardId = params.boardId as string
        executeDeleteCard({
            id: data.id,
            boardId,
        })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Opcje
            </p>
            <Button
                onClick={onCopy}
                disabled={isLoadingCopy}
                variant={'gray'}
                className="w-full justify-start"
                size={'inline'}
            >
                <Copy className="w-4 h-4 mr-2" />
                Kopiuj
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDelete}
                variant={'gray'}
                className="w-full justify-start hover:bg-rose-500"
                size={'inline'}
            >
                <Trash className="w-4 h-4 mr-2" />
                Usuń
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-20 h-4 bg-neutral-200" />
        </div>
    )
}