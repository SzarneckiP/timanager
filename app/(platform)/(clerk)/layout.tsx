import React from 'react'

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex bg-neutral-800 h-full justify-center items-center'>
            {children}
        </div>
    )
}

export default ClerkLayout