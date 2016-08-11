import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Rx';

@Injectable()
export class ToolbarService {

  constructor() {}

  activeReportTitle: string = '';
  infoLink: string;
  showToolbar: boolean;
  showDashboard: boolean;
  showControl: boolean = true;
  doDownload: boolean = false;
}
