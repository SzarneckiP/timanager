import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { plPL } from "@clerk/localizations";

import { ModalProvider } from '@/components/providers/modal-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider localization={plPL}>
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}

export default PlatformLayout