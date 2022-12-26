import { Dialog, DialogButton } from 'konsta/react'
import { useState } from 'react'
import NotificationCard from './NotificationCard'

export default function Notifications() {
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [detailsTitle, setDetailsTitle] = useState('')
    const [detailsContent, setDetailsContent] = useState('')

    const handleOpenDetails = (i) => {
        setDetailsTitle(`Notification ${i}`)
        setDetailsContent(
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dignissimos quidem architecto eaque alias dolorem velit iusto necessitatibus unde molestias! ${i}`
        )
        setDetailsOpen(true)
    }

    return (
        <div className="max-w-screen-sm mx-auto my-8">
            {Array(10)
                .fill('_')
                .map((_, i) => (
                    <NotificationCard key={i} onClick={() => handleOpenDetails(i)} />
                ))}

            <Dialog
                title={detailsTitle}
                content={detailsContent}
                colors={{ titleIos: 'text-magenta-600' }}
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
