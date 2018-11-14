import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { IAboutUs } from './aboutUs'; 
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  providers: [AboutUsService],
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, IAboutUs {

  constructor(private aboutUsService: AboutUsService) { 
    
  }

  ngOnInit() {
    var result = this.aboutUsService.getAboutUsData().subscribe(); 
    console.log(result, 'this is the result my dude'); 
  }

  whatever(): void {
    
  }
}
