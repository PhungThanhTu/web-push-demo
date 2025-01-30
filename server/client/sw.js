console.log("Service worker loaded");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  this
    .clients
    .matchAll()
    .then(
      clients => {
    clients.forEach(client => {
      client.postMessage(data);
    })});

});

self.addEventListener("message", (event) => {
  console.log(`Message received: ${JSON.stringify(event.data)}`);
});