'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const BoardBackButton = () => {

    const route = useRouter()

    return (
        <Button
            onClick={route.back}
            className="py-1"
            variant={'transparent'}
            size={'sm'}
        >
            <ArrowLeft className="h-4 w-4" />
        </Button>
    )
}
