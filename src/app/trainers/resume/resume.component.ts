import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  @Input() showResumeFor: string;
  private toggleLeviResume = 'Levi';
  private toggleCeceResume = 'Cece';
  public resumeContentToDisplay: string;
  public leviResumeContent: string;
  public ceceResumeContent: string;

  constructor() { }

  ngOnInit() {
    this.resumeContentToDisplay = this.showResumeFor 
    == this.toggleLeviResume ? this.leviResumeContent : this.ceceResumeContent;

    this.resumeContentToDisplay = `<div>Hey there peeps</div>`
  }; 


}
