import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  @Input() toggleLeviResume : boolean;
  public resumeContentToDisplay: string;
  public leviResumeContent: string;
  public ceceResumeContent: string;

  constructor() { }

  ngOnInit() {
    this.resumeContentToDisplay = this.toggleLeviResume ? this.leviResumeContent : this.ceceResumeContent;

    this.resumeContentToDisplay = `<div>Hey there peeps</div>`

    console.log(this.toggleLeviResume, 'THIS IS THE INPUT PARAM'); 
  }; 


}
