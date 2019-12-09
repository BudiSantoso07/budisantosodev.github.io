importScripts('./js/workbox-sw.js');
if (workbox) {
    console.log(`Workbox berhasil dimuat`);
}else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/navigation.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/routes/web.js', revision: '1' },
    { url: '/img/icon512x512.png', revision: '1' },
    { url: '/img/icon192x192.png', revision: '1' },
    { url: '/img/profil.png', revision: '1' },
    { url: '/js/pwa.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/api/global.js', revision: '1' },
    { url: '/api/info-team.js', revision: '1' },
    { url: '/api/klasemen.js', revision: '1' },
    { url: '/database/index-db.js', revision: '1' },
    { url: '/database/team-saya.js', revision: '1' },
    { url: '/notification/push-notif.js', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});