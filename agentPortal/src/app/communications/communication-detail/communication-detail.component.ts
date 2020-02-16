import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Communication } from '../communication.model';

@Component({
  selector: 'app-communication-detail',
  templateUrl: './communication-detail.component.html',
  styleUrls: ['./communication-detail.component.css']
})
export class CommunicationDetailComponent implements OnInit {
  @Input() communication: Communication;
  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.communicationService
      .updateCommunication(this.communication.imagePath, { active: isActive })
      .catch(err => console.log(err));
  }
  deleteCommunication() {
    this.communicationService
      .deleteCommunication(this.communication.imagePath)
      .catch(err => console.log(err));
  }

}
