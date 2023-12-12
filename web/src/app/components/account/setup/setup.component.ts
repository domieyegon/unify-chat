import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ImageCropperModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {

  user:any = JSON.parse(sessionStorage.getItem('user') || '{}');

  data:CropperDialogData = {};
  croppedImage: CropperDialogResult = {};

  setUpForm= new FormGroup({
    slogan: new FormControl(''),
    userId: new FormControl(this.user.id),
    logoUrl: new FormControl('')
  });

  constructor(){}


  uploadPhoto(event:any){
    const file = event.target.files[0];
    console.log(file);

    if (file){
      this.data.image= file;
      document.getElementById('cropperModalBtn')?.click()
    }

  }

  imageCropped(event: ImageCroppedEvent){
    const {blob, objectUrl}= event;
    if (blob && objectUrl){
      this.croppedImage.blob = blob;
      this.croppedImage.imageUrl = objectUrl;
    }
  }

  croppedResult(){
    // this.croppedImage.blob
    console.log(this.croppedImage?.blob)
  }

}

export type CropperDialogData = {
  image?: File;
}

export type CropperDialogResult = {
  blob?: Blob;
  imageUrl?: string;
}