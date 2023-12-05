import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  currentActiveId =0;

  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');

  isSearchItem=false;
  allContacts:any[] =[];


  @Input() messages: any[]= []

  @Output() chatEmitter = new EventEmitter<any>();

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.getUsers();
  }

  viewChat(currentChatUser: any) {
    this.currentActiveId = currentChatUser.id;
    this.chatEmitter.emit(currentChatUser);
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (res:any)=> {
        this.allContacts = res.body;
      }
    })
  }

}
