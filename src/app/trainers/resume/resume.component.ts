import { Component, OnInit, Input } from '@angular/core';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  public toggleLeviResume : boolean; 
  public resumeContentToDisplay: string;
  public leviResumeContent: string;
  public ceceResumeContent: string;

  constructor(private trainingService : TrainingService) { 

  }

  ngOnInit() {
    this.resumeContentToDisplay = this.toggleLeviResume ? this.leviResumeContent : this.ceceResumeContent;

    this.resumeContentToDisplay = `<div>Hey there peeps</div>`

    console.log(this.trainingService.resumeFor, 'THIS IS THE INPUT PARAM'); 
  }; 

  print(){
    console.log(this.trainingService.resumeFor, 'AFTER INIT'); 
  }
}
