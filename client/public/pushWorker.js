self.addEventListener('install', () => {
    console.log('Service worker installed')
})

self.addEventListener('push', (e) => {
    const notificationsChannel = new BroadcastChannel('notifications')
    const data = e.data.json()

    notificationsChannel.postMessage(data)

    registration.showNotification(data.name, {
        body: data.title,
        tag: data.name,
        icon: 'app-icon.png'
    })
})
