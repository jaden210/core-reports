import { Component, OnInit, DoCheck, Input, Output, EventEmitter, HostListener}   from '@angular/core';
import{ trigger, state, style, transition, animate }        from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { ToolbarService }                                   from '../../toolbar.service';
import { BooklistService }                                  from '../booklist.service';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES }                            from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button';
import { MD_LIST_DIRECTIVES }                               from '@angular2-material/list';
import { MD_PROGRESS_CIRCLE_DIRECTIVES }                    from '@angular2-material/progress-circle';

@Component({
  moduleId: module.id,
  selector: 'app-booklist-report',
  templateUrl: 'booklist-report.component.html',
  styleUrls: ['booklist-report.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
})

export class BooklistReportComponent implements OnInit {

  constructor(private _toolbarService: ToolbarService, private _booklistSevice: BooklistService) {

  }

  reportData: any;
  showReport: boolean;
  showNoDataDialog: boolean;
  loading: boolean;
  stuck: boolean;

  //sticks header to top of page on scoll
  @HostListener('window:scroll', ['$event']) stick(event) {
    if (window.pageYOffset > 75) {
      this.stuck = true;
    } else {
      this.stuck = false;
    }

  }

  runReport() {
    this.showReport = false;
    this.loading = true;
    this._booklistSevice.getReport()
      .subscribe(
      data => { this.reportData = data.booklistLine, this.checkForData() }
      //error => { this.noData(error) }
      );
  }

  checkForData(): void {
    if (this.reportData.length >= 1) {
      this.loading = false;
      this.showReport = true;
    } else {
      this.showNoDataDialog = true;
    }
  }

  closeErrorDialog() {
    this.showNoDataDialog = false;
  }

  ngDoCheck() {
    if (this._booklistSevice.doRun) {
      this.runReport();
      this._booklistSevice.reportData = this.reportData;
      this._booklistSevice.doRun = false;
    }
    if (this._toolbarService.doDownload) {
      this.downloadReport();
      this._toolbarService.doDownload = false;
    }
  }

  ngOnInit() {
  }



  downloadReport() {

    console.log("running");
  }




}






