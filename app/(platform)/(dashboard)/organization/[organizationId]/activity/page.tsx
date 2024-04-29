import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/info"
import { ActivityList } from "./_components/activity-list"
import { checkSubscription } from "@/lib/subscription"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const ActivityPage = async () => {
    const isPro = await checkSubscription()

    const { orgId } = auth()

    if (!orgId) {
        redirect('/select-org')
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })


    return (
        <div className="w-full">
            <Info isPro={isPro} />
            <Separator className="my-2" />
            {/* <Suspense fallback={<ActivityList.Skeleton />} > */}
            {!auditLogs ? <ActivityList.Skeleton /> : <ActivityList auditLogs={auditLogs} />}
            {/* <ActivityList auditLogs={auditLogs} /> */}
            {/* </Suspense> */}
        </div>
    )
}


export default ActivityPage