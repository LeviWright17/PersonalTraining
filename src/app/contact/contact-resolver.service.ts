import { Injectable } from '@angular/core'; 
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { Observable } from 'rxjs'; 
import { contact } from '../models/contact.model'
import { contactError } from '../models/contactError.model'; 
import { ContactService } from '../contact/contact.service'; 

export class ContactResolverService implements Resolve<contact | contactError>{
    
    constructor(private contactService: ContactService) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): contact | contactError | Observable<contact | contactError> | Promise<contact | contactError> {
        throw new Error("Method not implemented.");
    }

}