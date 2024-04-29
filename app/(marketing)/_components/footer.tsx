'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const Footer = () => {
    const route = useRouter()

    const privacyPolicy = () => {
        route.push('/privacy-policy')
    }

    return (
        <div
            className="fixed bottom-0 w-full p-4 border-t bg-slate-100"
        >
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                    <Button onClick={() => privacyPolicy()} className='sm' variant={'ghost'}>
                        Polityka Prywatności
                    </Button>
                    <Button className='sm' variant={'ghost'}>
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Footer