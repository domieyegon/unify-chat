import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ListComponent, MessagesComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');


  contacts:any[]=[];
  sentMessages:any[]=[];
  allConversations:any[]=[];
  userSpecificConversations:any[]=[];
  isViewChat:boolean = false;
  selectedChat:any = {};

  constructor(private websocketService:WebSocketService){}


  ngOnInit(): void {
    this.connectToWebSocket();
  }

  sendMessage(message:any): void {
    this.websocketService.sendMessage(message);
    message.sentAt = new Date();
    this.allConversations.push(message);

    if (message.receiver.id === this.selectedChat?.id){
      this.userSpecificConversations.push(message);
      this.selectedChat.chats = this.userSpecificConversations;
    }

    let contact = this.generateContact(message.receiver, message.message, message.sentAt);
    this.getContacts(contact);
  }

  connectToWebSocket(){

    this.websocketService.connect().subscribe(()=> {
      this.websocketService.receiveMessages(this.user.id).subscribe((message: any) => {

        if (message.sentAt instanceof Array){
          message.sentAt = this.formatDate(message.sentAt);
        }

        this.allConversations.push(message);
        
        if (message?.sender?.id === this.selectedChat?.id){
          this.userSpecificConversations.push(message);
          this.selectedChat.chats = this.userSpecificConversations;
        }
        let contact = this.generateContact(message.sender, message.message, message.sentAt);
        this.getContacts(contact);

      });
    });
  }

  getContacts(contact:any){
    if (this.contacts.length > 0){
      let index = this.contacts.findIndex((c:any)=> c?.id === contact?.id);
      console.log(index)
      if (index > 0){
        this.contacts.splice(index, 1);
        this.contacts.unshift(contact);
      } else if (index == -1) {
        this.contacts.unshift(contact);
      } else {
        this.contacts[index] = contact;
      }
    } else {
      this.contacts.push(contact);
    }
  }

  generateContact(user: any, message: string, sentAt: any){
    return Object.assign({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      lastMessage: message,
      sentAt: sentAt
    })
  }

  viewChat(user:any){
    this.isViewChat = true;
    this.selectedChat = user;
    this.userSpecificConversations=[];
    this.userSpecificConversations =this.allConversations.filter((chat:any)=> (chat.sender.id === this.user.id && chat.receiver.id === user.id) || (chat.sender.id === user.id && chat.receiver.id === this.user.id));
    this.selectedChat.chats = this.userSpecificConversations;
  }

  formatDate(dateComponents: number[]){
    return new Date(
      dateComponents[0],  // Year
      dateComponents[1] - 1,  // Month (0-based)
      dateComponents[2],  // Day
      dateComponents[3],  // Hours
      dateComponents[4],  // Minutes
      dateComponents[5],  // Seconds
      // Math.floor(dateComponents[6] / 1000)  // Milliseconds
    );
  }

}
