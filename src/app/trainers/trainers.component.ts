import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  private resumeFor : string = ""; 

  constructor(private trainingService : TrainingService) { }

  ngOnInit() {
  }

  toggleResumeContent(resumeFor : string){; 
    this.trainingService.resumeFor = resumeFor;
    this.resumeFor = this.trainingService.resumeFor;  
    console.log(this.resumeFor, 'the resume is for'); 
  } 

}
