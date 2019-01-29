import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { IAboutUs } from './aboutUs'; 

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  // providers: [AboutUsService],
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, IAboutUs {

  constructor() { 
    
  }

  ngOnInit() {

  }
}
