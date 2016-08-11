import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers }   from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooklistService {
  private _booklistUrl          = 'http://localhost:8080/app-rest/ro/v1/booklist/';
  private _booklistDashboardUrl = 'http://localhost:8080/app-rest/ro/v1/booklist/dashboard/';
  private _termUrl              = 'http://localhost:8080/app-rest/ro/v1/input-controls/term/';
  private _departmentUrl        = 'http://localhost:8080/app-rest/ro/v1/input-controls/department/';
  infoLink                      = 'https://support.gosidewalk.com/hc/en-us/articles/221873168-Test-this-article'; 
  private _authToken            = 'Basic Y29ycEB1Y2VudGl2ZS5jb206NmdldHVzZWQ=';
  activeData: any = { 'locationId': 21944, 'termName': "", 'termId': "", 'departmentName': "", 'departmentId': "" };
  termData: any;
  reportData: any;
  //this is what will cause the report to rerun when parameters are changed
  doRun: boolean = false;
  doDownloat: boolean = false;

  constructor(private _http: Http) {}
  headers: any;
 
  getReport(): any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken);
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', this.activeData.termId);
    params.set('deptId', this.activeData.departmentId);
    return this._http.get(this._booklistUrl + this.activeData.locationId + '?', {headers: this.headers, search : params})
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

  getDashboard(): any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken);
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', this.activeData.termId);
    params.set('deptId', this.activeData.departmentId);
    return this._http.get(this._booklistDashboardUrl + this.activeData.locationId + '?', {headers: this.headers, search : params})
      .map((response: Response) => <any>response.json());
  }

//Input controls
  getTerm():any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken);    
    return this._http.get(this._termUrl + this.activeData.locationId + '?', {headers : this.headers})
    .map((response : Response) => <any>response.json());
  }
  getDepartment(termId):any {
    this.headers = new Headers();
    this.headers.append('Authorization', this._authToken);
    let params : URLSearchParams = new URLSearchParams();
    params.set('termId', termId);
    return this._http.get(this._departmentUrl + this.activeData.locationId + '?', {headers : this.headers, search : params})
    .map((response : Response) => <any>response.json());
  }
}