import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  @Input() resumeFor : string;
  private leviResume : string = 'levi'; 
  public resumeContentToDisplay: string;
  public leviResumeContent: string = `
  <div class="jumbotron">
  <div class="container">
    <h2>Levi Wright</h2>
    <ul>
      <li>20 Years Experience</li>
      <li>Dixie State University First Team & Scholarship Earner</li>
      <li>Real Salt Lake Pro - Youth Academy First 18 Squad 2008 - 2010</li>
      <li>Utah ODP Traveling Team 2008 - 2010</li>
      <li>Far West Regionals Second Place 2010 (Inter 92' Premier Utah)</li>
      <li>2-Time Utah State Cup Champion, 1-Time Utah State Cup 2nd Place, 2-Time Utah State Cup Semi-Finalist</li>
      <li> 5-Time AAA Premier Utah Boys League Winner </li>
      <li>Four Year High School Varsity Starter</li>
      <li>2 Year Varsity Team Captain</li>
      <li>2-Time All State First Team, 1-Time All State Honorable Mention</li>
      <li>Varsity Offensive Player of the Year</li>
      <li>Varsity 2-Mile time record setter : 10:07
      <li>Dixie Soccer Camp MVP 2006</li>
      <li>Some Victories I've Been a Part Of: 2 State Cup Champion Titles, 1 State Cup 2nd Place Medal, Pike's Peak Invitational Champion, Puma Mayor's Cup Champion, Far West Regionals 2nd Place Medal, Nike Surf Cup 2nd Place Medal,
      4-Time St George Invitational Champion, 6-Time Salt Lake County Futsal League Champion, Winter League Golden Boot Winner 2007</li>
    </ul>
    <p>
      Soccer was my life's work and greatest accomplishment for the majority of my life. I know what it takes to make it to high profile teams, achieve far more than what is expected of me, and to be a part of a winning team.
      Although I can help you with any of your soccer needs, I specialize in individual attacking, goal-scoring, defensive aggression, positioning, footskill, and try-out confidence. Let's work together and achieve your goals!
    </p>
  </div>
</div>`;
  public ceceResumeContent: string = `<div>Cece resume content</div>`;

  @Output() displayPhotosEvent: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor() { 

  }

  ngOnInit() {
    this.resumeContentToDisplay = this.resumeFor == this.leviResume ? this.leviResumeContent : this.ceceResumeContent;
  }; 

  print(){
    this.displayPhotosEvent.emit(true); 
  }
}


