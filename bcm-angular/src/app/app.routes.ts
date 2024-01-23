import { Routes } from '@angular/router';
import { BcmLoginComponent } from './bcm-login/bcm-login.component';
import { BcmDashboardComponent } from './bcm-dashboard/bcm-dashboard.component';

export const routes: Routes = [
    { path : '', component: BcmLoginComponent },
    { path : 'dash', component: BcmDashboardComponent }
];
