import { z } from 'zod'

export const CreateBoard = z.object({
    title: z.string({
        required_error: 'Title is required.',
        invalid_type_error: 'Wpisz tytuł.'
    }).min(3, {
        message: 'Tytuł jest zbyt krótki.'
    }),
    image: z.string({
        required_error: 'Image required.',
        invalid_type_error: "Zaznacz zdjęcie.",
    }),
})

