importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBo9cW3ZVO6dyYTJM-zYPQLUkdL6StYvCw",
  authDomain: "sbsbapp-6ea34.firebaseapp.com",
  projectId: "sbsbapp-6ea34",
  storageBucket: "sbsbapp-6ea34.firebasestorage.app",
  messagingSenderId: "176953247293",
  appId: "1:176953247293:web:fb3943c34e8b988cbc8c54",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.data && payload.data.title) || "새 업무 배정";
  const body = (payload.data && payload.data.body) || "";
  const url = (payload.data && payload.data.url) || "./";
  self.registration.showNotification(title, {
    body,
    icon: "./icon-192.png",
    data: { url },
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          if ('navigate' in client) client.navigate(url).catch(() => {});
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
