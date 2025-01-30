const PUBLIC_VAPID_KEY = "BAm-7mVRbzl7xW6fXuMXY4B8NOFffh_dhJq3e0Lsq4PkvKIw6cVfJZLArk8p6UcP7ESLNzvq_TaKYfDRbrnFZY8"


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    console.log(padding);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    console.log(base64)
    const rawData = Buffer.from(base64)
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData[i];
    }
    return outputArray;
  }