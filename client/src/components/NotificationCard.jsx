import { Block } from 'konsta/react'

export default function NotificationCard({ notification: { name, title, timestamp }, ...props }) {
    return (
        <Block
            className="active:bg-ios-light-surface-2 active:dark:bg-ios-dark-surface-2 transition-colors cursor-pointer !m-4"
            strong
            inset
            {...props}
        >
            <div className="flex justify-between pb-6">
                <p className="text-[17px] md:text-lg text-magenta-600 font-semibold line-clamp-1">
                    {name}
                </p>
                <p className="text-sm md:text-base text-black/55 dark:text-white/55">{timestamp}</p>
            </div>
            <p className="text-sm md:text-base line-clamp-3">{title}</p>
        </Block>
    )
}
