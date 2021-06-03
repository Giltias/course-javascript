export default class WsClient {
  constructor(url, onMessage) {
    this.url = url;
    this.onMessage = onMessage;
  }

  connect() {
    return new Promise((resolve) => {
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener('open', resolve);
      this.socket.addEventListener('message', (e) => {
        this.onMessage(JSON.parse(e.data));
      });
    });
  }

  sendHello(name) {
    this.sendMessage('hello', { userName: name });
  }

  sendTextMessage(message) {
    this.sendMessage('text-message', { message });
  }

  sendMessage(type, data) {
    this.socket.send(
      JSON.stringify({
        type,
        data,
      })
    );
  }
}
