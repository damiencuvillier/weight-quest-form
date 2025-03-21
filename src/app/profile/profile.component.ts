import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router){

  }
  ngOnInit(): void {
    const data = localStorage.getItem('profile');
    if (data == null) {
      this.router.navigate(['disclaimer']);
    }
  }
}
