import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild, effect } from '@angular/core';
import {MatDrawer, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { BcmNavComponent } from '../bcm-nav/bcm-nav.component';
import { NavCommunicationService } from '../nav-communication.service';

@Component({
  selector: 'app-bcm-dashboard',
  standalone: true,
  imports: [MatSidenavModule, BcmNavComponent],
  templateUrl: './bcm-dashboard.component.html',
  styleUrl: './bcm-dashboard.component.scss'
})
export class BcmDashboardComponent  {

  @ViewChild('drawer')
  drawer!: MatDrawer

  isDrOpn = false

  constructor(
    private navCom : NavCommunicationService
  ) {
    effect(() => {
      this.isDrOpn = this.navCom.getDrawerState()
      console.log(this.isDrOpn)

      if(this.isDrOpn)
        this.drawer.open()
      else  this.drawer.close()
    }) 
  }

  ngAfterViewInit() {
   
  }
}
