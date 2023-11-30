import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket!: WebSocket;
  messageReceived: Subject<any> = new Subject<any>();

  stompClient: any;


  constructor() { }

  initWebSocketConnection(){
    const socket = new SockJS('http://localhost:8080/u-chat-websocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/messages', (message:any) => {
        // handle received messages
        console.log(JSON.parse(message.body));

      this.messageReceived.next(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message:any) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }

  // initWebSocketConnection(){
  //   this.socket = new WebSocket("ws://localhost:8080/u-chat-websocket");

  //   this.socket.onopen = () => {
  //     console.log('WebSocket connection established.');
  //   };

  //   this.socket.onmessage = (event) => {
  //     console.log('Received message:', event.data);
  //     this.messageReceived.next(event.data);

  //   };

  //   this.socket.onclose = (event) => {
  //     console.log('WebSocket connection closed:', event);
  //   };

  //   this.socket.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };
  // }

  // sendMessage(message: any): void {
  //   this.socket.send(message);
  // }

  // closeConnection(): any {
  //   this.socket.close();
  // }
}
