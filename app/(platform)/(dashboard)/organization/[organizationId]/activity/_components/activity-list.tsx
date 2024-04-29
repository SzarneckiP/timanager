'use client'
import { useState } from "react"
import { ActivityItem } from "@/components/activity-item"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityPagination } from "./activity-pagination"
import { AuditLog } from "@prisma/client"

interface ActivityListProps {
    auditLogs: AuditLog[]
}

export const ActivityList = ({ auditLogs }: ActivityListProps) => {


    const totalItems = auditLogs.reduce((acc,) => acc + 1, 0)
    const itemsPerPage = 20
    const [currentPage, setCurrentPage] = useState(1)

    const lastItemIdx = currentPage * itemsPerPage
    const firstItemIdx = lastItemIdx - itemsPerPage
    const currentItems = auditLogs.slice(firstItemIdx, lastItemIdx)

    return (
        <>
            <ol className="space-y-4 my-4">
                <p className="hidden last:block text-sm text-center text-muted-foreground">
                    W tej grupie nie ma żadnych aktywności.
                </p>
                {currentItems.map((log) => (
                    <ActivityItem key={log.id} data={log} />
                ))}
            </ol>
            <ActivityPagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}


ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className="space-y-4 mt-4 ">
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[50%] h-14" />
            <Skeleton className="w-[70%] h-14" />
            <Skeleton className="w-[80%] h-14" />
            <Skeleton className="w-[75%] h-14" />
        </ol>
    )
}