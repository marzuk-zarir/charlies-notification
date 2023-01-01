import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'

dayjs.extend(relativeTime)

export default function useNotifications() {
    const [notifications, setNotifications] = useState([])
    const notificationsChannel = new BroadcastChannel('notifications')

    useEffect(() => {
        ;(async () => {
            const res = await fetch(`${import.meta.env.VITE_DOMAIN}/api/notifications`)
            const data = (await res.json()).map((n) => ({
                ...n,
                timestamp: dayjs(n.timestamp).fromNow()
            }))

            setNotifications(data)
        })()

        notificationsChannel.onmessage = (e) => {
            setNotifications((n) => {
                if (n.length === 10) {
                    n = n.slice(0, 9)
                }

                return [
                    {
                        ...e.data,
                        timestamp: dayjs(e.data.timestamp).fromNow()
                    },
                    ...n
                ]
            })
        }
    }, [])

    return notifications
}
