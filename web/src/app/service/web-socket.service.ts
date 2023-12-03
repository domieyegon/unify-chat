import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket!: WebSocket;
  messageReceived: Subject<any> = new Subject<any>();
  userSubject: Subject<any> = new Subject<any>();

  stompClient: any;


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




  connect():Observable<boolean>{
    const socket = new SockJS('http://localhost:8080/u-chat-websocket');
    this.stompClient = Stomp.over(() => {
      return new SockJS('http://localhost:8080/u-chat-websocket');
    });
    this.stompClient.withCredentials = true; // Enable credentials

    return new Observable((observer) => {
      this.stompClient.connect({}, () => {
        observer.next(true);
        this.registerUser();
      });
    });
  }

  registerUser() {
    const user: any = sessionStorage.getItem('user');
    this.stompClient.send('/app/register', {}, user);
    this.userSubject.next(user);
  }

  sendMessage(message:any) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
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
