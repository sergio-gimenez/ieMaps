import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  endpoint = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public getCosas(): Observable<any> {
    const url = this.endpoint;
    const headers = {'Content-Type': 'application/json'};

    return this.http.get(url, {headers});
  }


    private extractData(res: Response) {
        const body = res.json();
        return body;
    }

}
