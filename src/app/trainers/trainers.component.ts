import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  private resumeFor : string = "some string"; 
  public isDisplayPhotos : boolean;

  constructor() { 

  }

  ngOnInit() {
    this.isDisplayPhotos = true; 
  }

  toggleResumeContent(resumeFor : string){
    this.resumeFor = resumeFor; 
    this.isDisplayPhotos = false; 
  } 

  receiveDisplayPhotosMessage($event) {
    this.isDisplayPhotos = $event;
  }
}
