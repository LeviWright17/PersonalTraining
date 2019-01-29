import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  private resumeFor : string = "some string"; 
  public isDisplayPhotos : boolean = true; 

  constructor() { }

  ngOnInit() {
  }

  toggleResumeContent(resumeFor : string){
    this.resumeFor = resumeFor; 
    console.log(this.resumeFor, 'resume for'); 
    this.isDisplayPhotos = false; 
  } 

}
