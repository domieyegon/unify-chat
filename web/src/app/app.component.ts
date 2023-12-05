import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { NavigationService } from './service/navigation.service';
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
    private router: Router,
    private navigationService: NavigationService,
    private accountService: AccountService
    ) {

      let isLoggedIn = sessionStorage.getItem('isLoggedIn');
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.router.url == '/login' && isLoggedIn){
            this.navigationService.back();
          }
        }
      });
      
      setTimeout(()=>{
        if (!isLoggedIn && !this.accountService.isPublicPage()) {
          this.router.navigateByUrl("/login");
        }
      },2);
      
     
  }

  ngOnInit(): void {
  }

}
