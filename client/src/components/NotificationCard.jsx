import { Block } from 'konsta/react'

export default function NotificationCard({ ...props }) {
    return (
        <Block
            className="active:bg-ios-light-surface-2 active:dark:bg-ios-dark-surface-2 transition-colors cursor-pointer !m-4"
            strong
            inset
            {...props}
        >
            <div className="flex justify-between text-[17px] pb-6">
                <p className="text-magenta-600 font-semibold line-clamp-1">Lorem, ipsum</p>
                <p className="text-black/55 dark:text-white/55">now</p>
            </div>
            <p className="text-sm line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dignissimos quidem
                architecto eaque alias dolorem velit iusto necessitatibus unde molestias!
            </p>
        </Block>
    )
}
