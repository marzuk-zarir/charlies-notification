import { App, Navbar, Page } from 'konsta/react'
import { useEffect } from 'react'
import Notifications from './components/Notifications'

const registerSubscription = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/pushWorker.js', {
                scope: '/'
            })

            if (registration.active) {
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey:
                        'BFT89EZ1NEbxublJk2e4WV0O0nOEkKZfBan2YcdbPorn5dpDUtZMsIvZxjb5p4g7ih_byIbjfkejorppNWRb5Gs'
                })

                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                })
            }

            console.log('Subscribe to push notifications')
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        }
    }
}

export default function MainApp() {
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        }

        registerSubscription()
    }, [])

    return (
        <App theme="ios" className="sm:font-eloquia">
            <Page>
                <Navbar title="Charlie's Notification" titleFontSizeIos="text-[17px] md:text-lg" />
                <Notifications />
            </Page>
        </App>
    )
}
