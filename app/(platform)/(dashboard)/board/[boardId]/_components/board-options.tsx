'use client'

import { Button } from "@/components/ui/button"
import { deleteBoard } from "@/actions/delete-board"
import { useAction } from "@/hooks/use-action"
import { toastError, toastLoading, toastSuccess } from "@/constants/toaster"

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { MoreHorizontal, X } from "lucide-react"

import DeleteAlert from "./delete-alert"

interface BoardOptionsProps {
    id: string,
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onComplete() {
            toastSuccess('Tablica usunięta.')
        },
        onError(error) {
            toastError(error)
        },
    })

    const onDelete = () => {
        execute({ id })
    }

    if (isLoading) {
        toastLoading('Usuwanie...')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant={'transparent'}>
                    <MoreHorizontal
                        className="h-4 w-4"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3 mr-2"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Opcje Tablicy
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto text-neutral-600 absolute p-1.5 top-2 right-2 mr-1"
                        variant={'ghost'}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <DeleteAlert
                    desc={'tablicę'}
                    disabled={isLoading}
                    onDelete={onDelete}
                />
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions