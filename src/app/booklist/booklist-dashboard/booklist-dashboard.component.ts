import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange }   from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { ROUTER_DIRECTIVES, Router }                        from '@angular/router';
import { BooklistService }                                  from '../booklist.service';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button';
import { MD_LIST_DIRECTIVES }                               from '@angular2-material/list';
import { CHART_DIRECTIVES }                                 from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-booklist-dashboard',
  templateUrl: 'booklist-dashboard-inline.component.html',
  styleUrls: ['booklist-dashboard.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    CHART_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
export class BooklistDashboardComponent implements OnInit {
  constructor(private _booklistSevice: BooklistService) { }
  dashboardData = [{ "sectionCount": 0, "sectionNoAdoption": 0, "sectionNoInstructor": 0, "sectionNoEnrollment": 0, "isbnNoPrice": 0, "isbnForRent": 0 }];
  termData: any;
  oldTermId: string = "";
  oldDepartmentId: string = "";
  title = 'Booklist';
  locationId = "21944";
  //closebutton
  @Output() closeDashboard: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() activeData: any;

  //builds the chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['No Adoptions', 'No Instructors', 'No Enrollment'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [0, 0, 0], label: "Sections" }
  ];

  public chartHovered(e: any): void {
  }

  updateChart() {
    this.barChartData = [
      { data: [this.dashboardData[0].sectionNoAdoption, this.dashboardData[0].sectionNoInstructor, this.dashboardData[0].sectionNoEnrollment], label:"Sections" }
    ];
  }

  runDashboard() {
    this._booklistSevice.getDashboard(this.activeData)
      .subscribe(
      data => { this.dashboardData = data, this.updateChart() }
      )
  };

  closeDialog(boolean) {
    this.closeDashboard.emit(boolean);
  }

  ngDoCheck() {
    if (this.activeData.termId !== this.oldTermId) {
      this.runDashboard();
      this.oldTermId = this.activeData.termId;
    }
    if (this.activeData.departmentId !== this.oldDepartmentId) {
      this.runDashboard();
      this.oldDepartmentId = this.activeData.departmentId;
    }
  }

  ngOnInit() {
  }
}


