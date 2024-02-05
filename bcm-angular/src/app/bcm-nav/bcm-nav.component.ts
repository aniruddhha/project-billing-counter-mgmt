import { Component } from '@angular/core';
import { NavCommunicationService } from '../nav-communication.service';

@Component({
  selector: 'app-bcm-nav',
  standalone: true,
  imports: [],
  templateUrl: './bcm-nav.component.html',
  styleUrl: './bcm-nav.component.scss'
})
export class BcmNavComponent {

  constructor(
    private navCom : NavCommunicationService
  ) {

  }

  onDrawerMenuClicked() {
    this.navCom.setDrawerState()
  }
}
