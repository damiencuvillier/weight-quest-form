import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {path: 'profile/edit', component: ProfileEditComponent},
  {
    path: 'disclaimer', component: DisclaimerComponent
  }
];
