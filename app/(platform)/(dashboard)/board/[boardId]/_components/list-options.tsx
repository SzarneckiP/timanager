'use client'

import { List } from "@prisma/client"
import {
    Popover, PopoverClose, PopoverContent, PopoverTrigger
} from '@/components/ui/popover'
import { Button } from "@/components/ui/button"
import { MoreHorizontal, X } from "lucide-react"
import FormSubmit from "@/components/form/form-submit"
import { Separator } from "@/components/ui/separator"
import { deleteList } from "@/actions/delete-list"
import { useAction } from "@/hooks/use-action"
import { toastError, toastLoading, toastSuccess } from "@/constants/toaster"
import DeleteAlert from "./delete-alert"
import { ElementRef, useRef } from "react"
import { useFormStatus } from "react-dom"
import { copyList } from "@/actions/copy-list"


interface ListOptionsProps {
    data: List
    onAddCard: () => void
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null)
    const { pending } = useFormStatus()

    const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toastSuccess(`Lista "${data.title}" usunięta.`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toastError(error)
        },
    })

    const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toastSuccess(`Lista "${data.title}" skopiowana.`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toastError(error)
        },
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        executeDelete({ id, boardId })
    }

    const onCopied = (formData: FormData) => {
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        executeCopy({ id, boardId })
    }

    if (isLoadingDelete || isLoadingCopy) {
        toastLoading('Usuwanie...')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto px-2 py-1" variant={'ghost'}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Opcje Listy
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-1 right-1 text-neutral-600" variant={'ghost'}>
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal flex text-sm"
                    variant={'ghost'}
                >
                    Dodaj kartę..
                </Button>
                <form action={onCopied}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal flex text-sm"
                    >
                        Kopiuj listę..
                    </FormSubmit>
                </form>
                <Separator />

                <DeleteAlert
                    disabled={isLoadingDelete || pending}
                    desc="listę"
                >
                    <form action={onDelete}>
                        <input hidden name="id" id="id" value={data.id} />
                        <input hidden name="boardId" id="boardId" value={data.boardId} />
                        <FormSubmit disabled={isLoadingDelete} variant="ghost">Usuń</FormSubmit>
                    </form>
                </DeleteAlert>

            </PopoverContent>
        </Popover>
    )
}

export default ListOptions