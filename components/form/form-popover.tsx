'use client'

import { ElementRef, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'

import { FormInput } from './form-input'
import FormSubmit from './form-submit'
import { Button } from '../ui/button'
import { createBoard } from '@/actions/create-board'
import { FormPicker } from './form-picker'
import { toastError, toastSuccess } from '@/constants/toaster'
import { useProModal } from '@/hooks/use-pro-modal'

interface FormPopoverProps {
    children: React.ReactNode,
    side?: 'left' | 'right' | 'top' | 'bottom',
    align?: 'start' | 'center' | 'end',
    sideOffset?: number,
}

const FormPopover = ({
    children, side = 'bottom', align, sideOffset = 0
}: FormPopoverProps) => {

    const proModal = useProModal()
    const closeRef = useRef<ElementRef<'button'>>(null)
    const router = useRouter()

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toastSuccess('Tablica dodana!')
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toastError(error)
            proModal.onOpen()
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const image = formData.get('image') as string

        execute({ title, image })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className='w-80 pt-3'
                side={side}
                sideOffset={sideOffset}
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Dodaj tablicę
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 h-auto w-auto p-2 absolute  top-2 right-2 text-neutral-600'
                        variant='ghost'
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                        <FormPicker
                            id='image'
                            errors={fieldErrors}
                        />
                        <FormInput
                            required
                            className='focus-visible:ring-blue-200'
                            id='title'
                            label='Nazwa tablicy'
                            type='text'
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit
                        className='w-full'
                    >
                        Dodaj
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover >
    )
}

export default FormPopover
