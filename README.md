# Charlie's Notification

All notifications in one place.

## API Endpoints

Send notification to all subscribed devices

```http
POST /api/notify
content-type: application/json

{
    name: service_name
    title: notification_content
}
```

Subscribe for get new notifications

```http
POST /api/subscribe
content-type: application/json

{
    endpoint: subscription_endpoint
    keys: {
        p256dh: p256dh_key
        auth: public_auth_key
    }
}
```

Get latest 10 notifications

```http
GET /api/notifications
```

Get server health

```http
GET /api/health
```

## Technology

### Frontend:

-   React
-   Tailwind css
-   Konsta UI
-   Service Worker

### Backend:

-   Nodejs
-   Express.js
-   Web Push
-   Redis
