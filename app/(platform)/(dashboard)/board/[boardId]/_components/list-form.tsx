'use client'

import { Plus, X } from "lucide-react"
import { useState, useRef, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import ListWrapper from "./list-wrapper"
import { FormInput } from "@/components/form/form-input"
import FormSubmit from "@/components/form/form-submit"

import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/create-list"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toastError, toastSuccess } from "@/constants/toaster"

const ListForm = () => {
    const router = useRouter()
    const params = useParams()

    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<ElementRef<'form'>>(null)
    const inputRef = useRef<ElementRef<'input'>>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toastSuccess(`Lista "${data.title}" dodana.`)
            disableEditing()
            router.refresh()
        },
        onError: (error) => {
            toastError(error)
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    useEventListener('keydown', onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const boardId = formData.get('boardId') as string

        execute({
            title,
            boardId,
        })
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-sm"
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent focus-visible:ring-0 transition"
                        placeholder="Dodaj nazwę listy..."
                    />
                    <input
                        hidden
                        value={params.boardId}
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Dodaj listę
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size='sm'
                            variant='ghost'
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
                onClick={enableEditing}
            >
                <Plus className="h-4 w-4 mr-2" />
                Dodaj listę
            </button>
        </ListWrapper>
    )
}

export default ListForm