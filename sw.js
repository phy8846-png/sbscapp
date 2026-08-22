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
  const title = (payload.notification && payload.notification.title) || "새 업무 배정";
  const body = (payload.notification && payload.notification.body) || "";
  self.registration.showNotification(title, {
    body,
    icon: "./icon-192.png",
  });
});

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
