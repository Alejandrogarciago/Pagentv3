import { Component, OnInit } from '@angular/core';
import { XltofirestoreService } from '../core/xltofirestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message = 'Uploading';
  showMessage: boolean = false;

  constructor(private xlservice: XltofirestoreService) { }

  ngOnInit() {
  }

  fileChange(event): void {
    
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.showMessage = true;
      this.xlservice.uploadFile(file).then(() => {
        this.message = 'stored';
      })
    }
  }

}
