import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers }   from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorEmailService {

  constructor(private _http: Http) {}

}
