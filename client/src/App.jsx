import { App, Navbar, Page } from 'konsta/react'
import { useEffect } from 'react'
import Notifications from './components/Notifications'

export default function () {
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    return (
        <App theme="ios" className="sm:font-eloquia">
            <Page>
                <Navbar title="Charlie's Notifications" />
                <Notifications />
            </Page>
        </App>
    )
}
