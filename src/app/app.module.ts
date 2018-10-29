import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot([
      {path: 'about-us', component: AboutUsComponent },
      {path: 'contact', component: ContactComponent },
      {path: 'services', component: ServicesComponent },
      {path: '', redirectTo: 'about-us', pathMatch: 'full'}
    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
