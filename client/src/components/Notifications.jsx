import { Dialog, DialogButton } from 'konsta/react'
import { useState } from 'react'
import useNotifications from '../hooks/useNotifications'
import NotificationCard from './NotificationCard'

export default function Notifications() {
    const notifications = useNotifications()
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [detailsTitle, setDetailsTitle] = useState('')
    const [detailsContent, setDetailsContent] = useState('')

    const handleOpenDetails = ({ name, title }) => {
        setDetailsTitle(name)
        setDetailsContent(title)
        setDetailsOpen(true)
    }

    return (
        <div className="max-w-screen-sm mx-auto my-8">
            {notifications.length > 0 ? (
                notifications.map((notification, i) => (
                    <NotificationCard
                        key={i}
                        notification={notification}
                        onClick={() => handleOpenDetails(notification)}
                    />
                ))
            ) : (
                <p className="text-[17px] md:text-lg text-neutral-600 text-center font-bold">
                    There is no notification
                </p>
            )}

            <Dialog
                title={detailsTitle}
                content={<p className="md:text-base">{detailsContent}</p>}
                colors={{ titleIos: 'text-magenta-600' }}
                titleFontSizeIos="text-[17px] md:text-lg"
                sizeIos="w-[16.875rem] md:w-[20.625rem]"
                opened={detailsOpen}
                onBackdropClick={() => setDetailsOpen(false)}
                buttons={
                    <>
                        <DialogButton onClick={() => setDetailsOpen(false)}>Ok</DialogButton>
                    </>
                }
            />
        </div>
    )
}
