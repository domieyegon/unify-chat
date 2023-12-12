import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

  activationKey = this.activatedRoute.snapshot.paramMap.get('key');
  successMessage="";
  failureMessage="";

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService:AccountService
  ){}
  
  ngOnInit(): void {
    if (this.activationKey){
      this.accountService.activate({key: this.activationKey}).subscribe({
        next: (req:any) => {
          console.log(req);
          this.successMessage = req.body?.statusReason;
        },
        error: (err:any)=> {
          console.log(err);
          this.failureMessage = err.error?.message;
        }
      })
    }
  }


}
