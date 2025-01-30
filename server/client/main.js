const PUBLIC_VAPID_KEY = "BAm-7mVRbzl7xW6fXuMXY4B8NOFffh_dhJq3e0Lsq4PkvKIw6cVfJZLArk8p6UcP7ESLNzvq_TaKYfDRbrnFZY8"
const NOTIFICATION_ENDPOINT = "http://localhost:3000/subscribe"



if ("serviceWorker" in navigator) {
    send()
    .catch(err => console.error(err));


}

async function send() {

    const register = await registerServiceWorkerThroughNavigator();
    const subscription = await subscribeToPushManagerAndGetSubscription(register);

    await subscribeServer(subscription)
    
}

async function subscribeServer(subscription) {
    await fetch( NOTIFICATION_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        },
      });
}


async function registerServiceWorkerThroughNavigator() {
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("received event from main");
      console.log(event.data);
    })

    const register = await navigator
        .serviceWorker
        .register("./sw.js", {
            scope: "/"
        });
    await navigator.serviceWorker.ready;

    return register;
}

async function subscribeToPushManagerAndGetSubscription(register) {
    const subscription = await register
    .pushManager
    .subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY
    });
    return subscription;
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }