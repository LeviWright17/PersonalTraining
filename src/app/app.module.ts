import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { CustomErrorHandlerService } from './core/custom-error-handler-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'about-us', component: AboutUsComponent },
      {path: 'contact', component: ContactComponent },
      {path: '', redirectTo: 'about-us', pathMatch: 'full'}
    ], {useHash: true})
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandlerService }//assigns the error handler service to your custom error handler class
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
