import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

  //Home page : 
    //--> Make sure that those images are not too tall. We want it all to fit right there on the page without scrolling. 
  //Coaches: 
  //--> Make sure resume content is dynamically displayed based on the button clicked.
  //Contact: 
    //--> Display the data from the form on the send button event. 
    //--> show that you can interact with that api and filter data
    //--> get and post etc. 

  //Pricing: 
    //--> Link to paypal. 

  //Overall: 
    //--> clean up code and make sure styling is decent for a showing. 
    //--> Take some pictures and get them in there. 
