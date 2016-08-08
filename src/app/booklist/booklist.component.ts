import { Component, OnInit, Input, Output, EventEmitter }   from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { ROUTER_DIRECTIVES, Router }                        from '@angular/router';
import { BooklistDashboardComponent }                       from './booklist-dashboard/booklist-dashboard.component';
import { BooklistControlComponent }                         from './booklist-control/booklist-control.component';
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
    BooklistControlComponent
  ],
  providers: [
    BooklistService
  ],
})

export class BooklistComponent implements OnInit {
  constructor(private _booklistSevice: BooklistService, private _router: Router) { }
  reportData: any;
  termData: any;
  departmentData: any;
  showSpinner: boolean = false;
  showDialog: boolean = false;
  showDashboard: boolean = false;
  showControl: boolean = false;
  showReport: boolean = false;
  title = 'Booklist';
  locationId = "21944";
  //url parameters
  errInfo: any = { 'report': this.title, 'locationId': this.locationId };
  activeData: any = { 'locationId': this.locationId, 'termName': "", 'termId': "", 'departmentName': "", 'departmentId': "" };

  termId = "";
  departmentId = "";

  runReport() {
    this.showSpinner = true;
    this._booklistSevice.getReport(this.activeData)
      .subscribe(
      data => { this.reportData = data.booklistLine, this.checkForData() },
      error => { this.noData(error) },
      () => this.showSpinner = false
      );
  }

  checkForData(): void {
    if (this.reportData.length >= 1) {
      console.log('report data exists')
    } else {
      console.log('no report data')
    }
  }

  openInfoPage() {
    window.open("https://support.gosidewalk.com/hc/en-us/articles/221873168-Test-this-article");
  }

  //downloading and exporting data
  downloadReport() {
    this._booklistSevice.getReport(this.activeData)
      .subscribe(data =>
        this.startDownload(data.booklistLine)
      )
  };

  startDownload(data: any[]) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  //Dialog stuff goes here
  openDialog() {
    this.showDialog = true;
  }
  closeDialog($event) {
    this.showControl = $event;
    this.showDashboard = $event;
  }

  //dashboard controls
  openDashboard() {
    this.showDashboard = true;
  }
  closeDashboard($event) {
    if ($event) {
      this.runReport();
    } else {
      this.showDashboard = $event;
    }
  }
  //control controls
  openControl() {
    this.showControl = true;
  }
  closeControl($event) {
    if ($event) {
      this.runReport();
    };
    this.showControl = false;
    this.showReport = true;
  }

  showValue() {
    console.log(this.activeData);
  }

  ngOnInit() {
    //then lets show the control dialog so we can set the parameters
    this.openControl();
    this.openDashboard();
  }



  //error dialogshowNoDataDialog : boolean = false;
  showNoDataDialog: boolean = false;
  isDisabled: boolean = true;

  noData(error) {
    this.showNoDataDialog = true;
    alert("there is an error: " + error);
  }

  closeErrorDialog() {
    this.showNoDataDialog = false;
    this.openDialog();
  }

  emailError() {
    console.log('send an email');
    this.showNoDataDialog = false;
  }
}