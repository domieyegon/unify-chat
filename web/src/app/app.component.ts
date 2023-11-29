import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './service/web-socket.service';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';
  receivedMessages: any[] = [];


  constructor(private websocketService: WebSocketService) {}

  ngOnInit(): void {
    this.websocketService.initWebSocketConnection();
    this.websocketService.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
  }

  sendMessage(): void {
    const message = {
      message: 'Hello, WebSocket!',
    };
    this.websocketService.sendMessage(message);
  }
}
