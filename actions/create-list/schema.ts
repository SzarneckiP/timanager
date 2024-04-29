import { z } from 'zod'

export const CreateList = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: "Wpisz tytuł."
    }).min(3, {
        message: 'Tytuł jest zbyt krótki.',
    }),
    boardId: z.string()
})