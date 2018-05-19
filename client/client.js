const publicVapidKey = "BFvDWCMnGFYcIEY-fGw2loM3LxmjRWHwuip6PP1DQPm5MUVMTkObCUZ_NlflBwaeb101X_aKycMxkoKc7JvTg3U";

// Check for Service Worker
if('serviceWorker' in navigator) {
    send().catch(err => console.log(err)
    );
} else {
    console.log("Not Allowed");
}

// Register the serviceWorker, Register Push, Send Push
async function send() {
    // Register the serviceWorker
    console.log("Registering th Service Worker...");
    const register = await navigator.serviceWorker.register("./worker.js", {
        scope: "/"
    });
    console.log("Service worker Registered...");

     // Checking Notification Permission
     if (Notification.permission === 'denied') {
         console.log('The user has blocked notifications.');
         return;
     }

    // Check if push messaging is supported  
    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        return;
    } else {
         // Register Push
         console.log("Registering Push...");
         const subscription = await register.pushManager.subscribe({
             userVisibleOnly: true,
             applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
         });
         console.log("Push Registered...");

         // Send Push Notification
         console.log("Sending Push...");
         await fetch('/subscribe', {
             method: "POST",
             body: JSON.stringify(subscription),
             headers: {
                 'content-type': 'application/json'
             }
         });
         console.log("Push Sent...");
    }
    
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}