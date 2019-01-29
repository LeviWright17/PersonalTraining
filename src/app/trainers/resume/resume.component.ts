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
  public leviResumeContent: string = `<div>Levi resume content</div>`;
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


