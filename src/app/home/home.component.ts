import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected launched: boolean = false;

  constructor(private router: Router) {
  }

  launchGame() {
    document.documentElement.requestFullscreen();
    //this.router.navigate([ "/profile" ]).then();
  }

  ngOnInit() {
    setInterval(() => this.countdown(), 1000)
  }

  public counter = 3;

  private countdown() {
    this.counter--;
    if (this.counter === 0) {
      this.launched = true;
      setTimeout(() => this.launchGame(), 500);
    }
  }
}
