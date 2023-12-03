import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { WebSocketService } from './service/web-socket.service';
import { ChatComponent } from './components/chat/chat.component';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';


  constructor(
    private router: Router
    ) {
      if (!sessionStorage.getItem('isLoggedIn')) {
        this.router.navigateByUrl("/login");
      }
  }

  ngOnInit(): void {
  }

}
