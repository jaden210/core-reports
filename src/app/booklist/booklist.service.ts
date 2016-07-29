import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers }   from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooklistService {
  private _booklistUrl      = 'http://localhost:8080/app-rest/ro/v1/booklist/';
  private _termUrl          = 'http://localhost:8080/app-rest/ro/v1/input-controls/term?';
  private _departmentUrl    = 'http://localhost:8080/app-rest/ro/v1/input-controls/department?'; 
  private _authToken        = '';
  private _locationId       = '';

  constructor(private _http: Http) {}
  headers: any;
 
  getReport(URLPARAMS): any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken, 'application/csv')
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', URLPARAMS.termId);
    params.set('departmentId', URLPARAMS.departmentId);
    return this._http.get(this._booklistUrl + this._locationId + '?', {headers: this.headers, search : params})
      .map((response: Response) => <any>response.json())
  }

//Input controls
  getTerm(locationId):any {
    this._locationId = locationId;
    let params : URLSearchParams = new URLSearchParams();
    params.set('locationId', locationId);    
    return this._http.get(this._termUrl, {search : params})
    .map((response : Response) => <any>response.json()) 
  }
  getDepartment(termId):any {
    let params : URLSearchParams = new URLSearchParams();
    params.set('locationId', this._locationId);
    params.set('termId', termId);
    return this._http.get(this._departmentUrl, {search : params})
    .map((response : Response) => <any>response.json());
  }
}