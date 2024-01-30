import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
 

@Component({
  selector: 'app-bcm-login',
  standalone: true,
  imports: [
    RouterModule, 
    MatButtonModule, 
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bcm-login.component.html',
  styleUrl: './bcm-login.component.scss'
})
export class BcmLoginComponent {

    loginForm : FormGroup
    
    constructor(
      private router: Router,
      private fb: FormBuilder,
    ) {
      this.loginForm = this.fb.group({
        userName: [''],
        password: [''],
      })
    }

    onLogin() {
      console.log(this.loginForm.value)
      this.router.navigate(['/dash'])
    }
}
