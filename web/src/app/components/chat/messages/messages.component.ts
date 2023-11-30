import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../../service/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewInit {

  @ViewChild('textareaInputField') textarea!: ElementRef;
  @ViewChild('messageBody') messageBody!: ElementRef;

  maxHeight: number =0;
  textareaBorderWidth: number =0;
  receivedMessages: any[] = [];

  chatForm:any = {
    message: '',
  };
  


  constructor(private websocketService: WebSocketService){
  }

  ngAfterViewInit() {
    // Initialize max height and border width after the view is initialized
    this.maxHeight = 7 * parseFloat(getComputedStyle(this.textarea.nativeElement).lineHeight);
    this.textareaBorderWidth = 2 * parseFloat(getComputedStyle(this.textarea.nativeElement).borderWidth); 
  }


  ngOnInit(): void {
    this.websocketService.initWebSocketConnection();
    this.websocketService.messageReceived.subscribe((message: any) => {
      this.receivedMessages.push(message);
    });
  }


  sendMessage(): void {
    this.websocketService.sendMessage(this.chatForm);
    this.resetChatForm()
  }
  
  
  resetChatForm(){
    this.chatForm = {
      message: '',
    };
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
    this.sendMessage();
    this.messageBody.nativeElement.scrollTop = this.messageBody.nativeElement.scrollHeight;
    this.textarea.nativeElement.style.height = 'auto';
  }
}
