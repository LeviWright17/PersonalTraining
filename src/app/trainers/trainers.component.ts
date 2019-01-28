import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  private isLeviResume : boolean; 

  constructor() { }

  ngOnInit() {
  }

  toggleResumeContent(isLeviResume : boolean){
    this.isLeviResume = isLeviResume; 
    console.log(this.isLeviResume, 'levi resume coaches'); 
  }

}
