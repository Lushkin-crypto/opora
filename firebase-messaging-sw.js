/* Фоновые уведомления ОПОРЫ. Только публичная конфигурация веб-приложения. */
importScripts("https://www.gstatic.com/firebasejs/13.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/13.1.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCIVgSoUl3nC6S1Y3jBv7XRUWNH89cs94A",
  authDomain: "opora-c09e4.firebaseapp.com",
  projectId: "opora-c09e4",
  storageBucket: "opora-c09e4.firebasestorage.app",
  messagingSenderId: "121740188152",
  appId: "1:121740188152:web:41de91cacd67f52e881e0d"
});

const messaging = firebase.messaging();
const OPEN_URL = "https://lushkin-crypto.github.io/opora/";

messaging.onBackgroundMessage(function (payload) {
  const note = payload && payload.notification ? payload.notification : {};
  const data = payload && payload.data ? payload.data : {};
  const body = note.body || data.body || data.text || data.title || "Семейное событие";
  self.registration.showNotification("ОПОРА", {
    body: String(body),
    tag: "opora-event",
    data: { url: OPEN_URL }
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
    for (let i = 0; i < list.length; i += 1) {
      const client = list[i];
      if (client.url && client.url.indexOf("lushkin-crypto.github.io/opora") !== -1 && "focus" in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(OPEN_URL);
  }));
});
