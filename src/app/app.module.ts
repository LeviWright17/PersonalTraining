import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr'; 

import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomErrorHandlerService } from './core/custom-error-handler-service.service';
import { PricingComponent } from './pricing/pricing.component';
import { TrainersComponent } from './trainers/trainers.component';
import { ResumeComponent } from './trainers/resume/resume.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent,
    PricingComponent,
    TrainersComponent,
    ResumeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'about-us', component: AboutUsComponent },
      { path: 'trainers', component: TrainersComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'resume', component: ResumeComponent },
      { path: '', redirectTo: 'about-us', pathMatch: 'full' }
    ], { useHash: true })
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


//to do list for app : 
//Get success behavior around sending a message. 
//Do some posting and show the data that is being saved from the form. 
//Add a details page to explain how everything works. 

