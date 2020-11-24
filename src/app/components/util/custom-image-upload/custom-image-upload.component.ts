import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-image-upload',
  templateUrl: './custom-image-upload.component.html',
  styleUrls: ['./custom-image-upload.component.scss'],
})
export class CustomImageUploadComponent implements OnInit {

  @Output() image = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.createCustomUpload();
  }

  createCustomUpload() {

    const actualBtn = document.getElementById('actual-btn') as HTMLElement;
    const actualBtnInput = document.getElementById('actual-btn') as HTMLInputElement;
    const customBtn = document.getElementById('actual-btn') as HTMLElement;

    actualBtn.addEventListener("change", () => { this.uploadImage(actualBtnInput.files[0]) });

    // TODO: find a way to allow the entire fab button to be clickablee
    // customBtn.addEventListener('click', function() {
    //   actualBtn.click()
    // })

  }

  uploadImage(image: any) {
    const fileChosen = document.getElementById('file-chosen');
    fileChosen.textContent = "File Selected!"
    this.image.emit(image);
  }

}
