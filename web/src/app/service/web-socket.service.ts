import { Injectable } from '@angular/core';
import { Client, IPublishParams, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws=this;

  socket!: WebSocket;
  messageReceived: Subject<any> = new Subject<any>();
  userSubject: Subject<any> = new Subject<any>();

  stompClient!: Client;


  constructor() { }

  // initWebSocketConnection(){
  //   const socket = new SockJS('http://localhost:8080/u-chat-websocket');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, () => {
  //     this.stompClient.subscribe('/topic/messages', (message:any) => {
  //       // handle received messages
  //       console.log(JSON.parse(message.body));

  //     this.messageReceived.next(JSON.parse(message.body));
  //     });
  //   });
  // }

  // sendMessage(message:any) {
  //   this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  // }




  // connect():Observable<boolean>{
  //   const socket = new SockJS('http://localhost:8080/u-chat-websocket');
  //   this.stompClient = Stomp.over(() => {
  //     return new SockJS('http://localhost:8080/u-chat-websocket');
  //   });
  //   this.stompClient.withCredentials = true; // Enable credentials

  //   return new Observable((observer) => {
  //     this.stompClient.connect({}, () => {
  //       observer.next(true);
  //       this.registerUser();
  //     });
  //   });
  // }http

  connect():Observable<boolean> {
    const token = sessionStorage.getItem('X-Auth-Token');


    this.stompClient = new Client({
      // brokerURL: 'ws://localhost:8080/u-chat-websocket',
      webSocketFactory: ()=> new SockJS('http://localhost:8080/u-chat-websocket'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: function (str:any) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    
    this.stompClient.onStompError = function (frame:any) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    
    this.stompClient.activate();
    
    return new Observable((observer) => {
      this.stompClient.onConnect = function (frame:any) {
        console.log(frame);
        observer.next(true);
      };
    });

  }

  registerUser() {
    const user: any = sessionStorage.getItem('user');
    
    // this.stompClient.send('/app/register', {}, user);
    this.userSubject.next(user);
  }

  sendMessage(message:any) {
    const request:IPublishParams = {
      destination: "/app/chat",
      body: JSON.stringify(message)
    }
    this.stompClient.publish(request);
    // this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }

  receiveMessages(userId: any): Observable<any> {
    return new Observable((observer) => {
      this.stompClient.subscribe(`/topic/${userId}/messages`, (message:any) => {
        observer.next(JSON.parse(message.body));
      });
    });
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
