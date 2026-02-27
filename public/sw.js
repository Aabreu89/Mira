self.addEventListener('push', function (event) {
    let data = { title: 'Nova Notificação MIRA', body: 'Você tem uma nova atualização.' };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/mira-icon.png', // Fallback icon
        badge: '/mira-badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver Detalhes',
                icon: '&#x2713;'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '&#x2715;'
            },
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (event.action === 'explore') {
        // Handle exploration action
        event.waitUntil(
            clients.openWindow('/')
        );
    } else {
        // Default click action
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
