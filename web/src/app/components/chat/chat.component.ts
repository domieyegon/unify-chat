import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ListComponent, MessagesComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
