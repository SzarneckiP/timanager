import { z } from 'zod'

export const CreateCard = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: "Wpisz tytuł."
    }).min(3, {
        message: 'Tytuł jest zbyt krótki.',
    }),
    boardId: z.string(),
    listId: z.string(),
})