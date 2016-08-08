import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers }   from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooklistService {
  private _booklistUrl          = 'http://localhost:8080/app-rest/ro/v1/booklist/';
  private _booklistDashboardUrl = 'http://localhost:8080/app-rest/ro/v1/booklist/dashboard/';
  private _termUrl              = 'http://localhost:8080/app-rest/ro/v1/input-controls/term/';
  private _departmentUrl        = 'http://localhost:8080/app-rest/ro/v1/input-controls/department/'; 
  private _authToken            = 'Basic Y29ycEB1Y2VudGl2ZS5jb206NmdldHVzZWQ=';
  private _locationId           = '';

  constructor(private _http: Http) {}
  headers: any;
 
  getReport(activeData): any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken, 'application/csv');
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', activeData.termId);
    params.set('deptId', activeData.departmentId);
    return this._http.get(this._booklistUrl + this._locationId + '?', {headers: this.headers, search : params})
      .map((response: Response) => <any>response.json())
      .catch(this.handleError)
  }
  //not sure if this does anything...
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getDashboard(activeData): any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken, 'application/csv');
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', activeData.termId);
    params.set('deptId', activeData.departmentId);
    return this._http.get(this._booklistDashboardUrl + this._locationId + '?', {headers: this.headers, search : params})
      .map((response: Response) => <any>response.json());
  }

//Input controls
  getTerm(locationId):any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken, 'application/csv');
    this._locationId = locationId;    
    return this._http.get(this._termUrl + locationId + '?', {headers : this.headers})
    .map((response : Response) => <any>response.json());
  }
  getDepartment(termId):any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken, 'application/csv');
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', termId);
    return this._http.get(this._departmentUrl + this._locationId + '?', {headers : this.headers, search : params})
    .map((response : Response) => <any>response.json());
  }
}