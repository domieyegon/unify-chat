import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewInit {

  @ViewChild('textareaInputField') textarea!: ElementRef;

  maxHeight: number =0;
  textareaBorderWidth: number =0;

  constructor(){
  }

  ngAfterViewInit() {
    // Initialize max height and border width after the view is initialized
    this.maxHeight = 7 * parseFloat(getComputedStyle(this.textarea.nativeElement).lineHeight);
    this.textareaBorderWidth = 2 * parseFloat(getComputedStyle(this.textarea.nativeElement).borderWidth); 
  }


  ngOnInit(): void {
  }
  
  

  onInput() {
    this.textarea.nativeElement.style.height = 'auto'; // Reset the height to auto
    this.textarea.nativeElement.style.height = `${Math.min(
      this.textarea.nativeElement.scrollHeight + this.textareaBorderWidth,
      this.maxHeight
    )}px`;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on Enter
      this.onSubmitOrPerformAction();
    }
  }

  onClick() {
    this.onSubmitOrPerformAction();
  }

  private onSubmitOrPerformAction() {
    // Add your submit or action logic here
    console.log('Submit or perform action');
  }
}
