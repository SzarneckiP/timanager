'use client'

import { Card } from "@prisma/client"

import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { AlignLeft } from "lucide-react";

interface CardItemProps {
    data: Card;
    index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
    const cardModal = useCardModal()

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    onClick={() => cardModal.onOpen(data.id)}
                    className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm flex justify-between"
                >
                    {data.title}
                    <AlignLeft className={`h-4 w-4 mt-0.5 text-neutral-700 ${data.description ? 'block' : 'hidden'}`} />
                </div>
            )}
        </Draggable>
    )
}
