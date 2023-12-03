import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  currentActiveId =0;

  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');


  @Input() messages: any[]= []

  @Output() chatEmitter = new EventEmitter<any>();

  viewChat(currentChatUser: any) {
    this.currentActiveId = currentChatUser.id;
    this.chatEmitter.emit(currentChatUser);
  }


}
