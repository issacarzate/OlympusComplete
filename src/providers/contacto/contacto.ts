import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class ContactoProvider {
  ContactosColl : ContactoRest[] = [];

  constructor(private httpclient: HttpClient) {
  }

  getContactosData() {
    let hdrs = new HttpHeaders({ 'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYW5nIjoyLCJpYXQiOjE1MzE4NTc1ODUsImV4cCI6MTU2MzM5MzU4NX0.tJN_m8n6sFD8to3JAXcVvdQ_WBH4xw8XUu-2a-HSCkM', 'Content-Type':  'application/json' });
    let promise = new Promise((resolve, reject) => {
      let apiURL = window.location.origin + '/api/v1/countries/contact';
      this.httpclient.get(apiURL, {headers: hdrs})
        .toPromise()
        .then(
          res => { // Success
            this.ContactosColl = res['countries'];
            console.log(this.ContactosColl);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        ).catch(this.handleError);
    });
    return promise;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

export interface ContactoRest {
  flagCode: string;
  countryName: string;
  internationalPhone: string;
  localPhone: string;
  whatsApp: string;
}
