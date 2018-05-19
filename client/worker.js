console.log("Service Woker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recived...");
    self.registration.showNotification(data.title, {
        body: "Notified by VJD",
        icon: "https://lh5.googleusercontent.com/-ZKx4DyC4AsE/VEA0zjLuUMI/AAAAAAAAAEY/dLyfVSJGmrU/w1000-h1001/vj.jpg"
    });
});