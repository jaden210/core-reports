import { Component, OnInit, OnChanges, Input, Output, EventEmitter }   from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { ROUTER_DIRECTIVES, Router }                        from '@angular/router';
import { ToolbarService }                                   from '../toolbar.service';
import { BooklistDashboardComponent }                       from './booklist-dashboard/booklist-dashboard.component';
import { BooklistControlComponent }                         from './booklist-control/booklist-control.component';
import { BooklistReportComponent }                          from './booklist-report/booklist-report.component';
import { BooklistService }                                  from './booklist.service';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES }                            from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button';
import { MD_LIST_DIRECTIVES }                               from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES }                    from '@angular2-material/progress-circle';
import { CHART_DIRECTIVES }                                 from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-booklist',
  templateUrl: 'booklist.component.html',
  styleUrls: ['../app.component.css', 'booklist.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    CHART_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    ROUTER_DIRECTIVES,
    BooklistDashboardComponent,
    BooklistControlComponent,
    BooklistReportComponent
  ],
  providers: [
    BooklistService
  ],
})

export class BooklistComponent implements OnInit {
  constructor(private _toolbarService: ToolbarService, private _booklistSevice: BooklistService, private _router: Router) 
  {
    _toolbarService.showToolbar = true;
  }

  showReport: boolean = false;
  title: string = 'Booklist';


  //downloading and exporting data
  downloadReport() {
    console.log('downloading');
    console.log(this._booklistSevice.reportData);
    this._booklistSevice.doDownloat = true;
    this._toolbarService.doDownload = false;
  }

  startDownload(data: any[]) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  //dashboard controls
  closeDashboard() {
    this._toolbarService.showDashboard = false;
  }

  //control controls

  closeControl($event) {
    this._toolbarService.showControl = false;
    this.showReport = true;
  }

  ngOnInit() {
    //passing data to the toolbar
    this._toolbarService.showControl = true;
    this._toolbarService.activeReportTitle = this.title;
    this._toolbarService.infoLink = this._booklistSevice.infoLink;
  }
}