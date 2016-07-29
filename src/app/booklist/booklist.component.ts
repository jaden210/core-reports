import { Component, OnInit, Input, Output, EventEmitter }   from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { BooklistService }                                  from './booklist.service';
import { BooklistDialog }                                   from './booklist-dialog.directive';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES }                            from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button'
import { MD_PROGRESS_CIRCLE_DIRECTIVES }                    from '@angular2-material/progress-circle';
import { CHART_DIRECTIVES }                                 from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-booklist',
  templateUrl: 'booklist.component.html',
  styleUrls: ['../app.component.css','booklist.component.css'],
  directives: [MD_CARD_DIRECTIVES,
  MD_PROGRESS_CIRCLE_DIRECTIVES,
  MD_TOOLBAR_DIRECTIVES,
  MD_BUTTON_DIRECTIVES,
  CHART_DIRECTIVES],
  providers: [ BooklistService ],
})

export class BooklistComponent implements OnInit {
  constructor(private _booklistSevice: BooklistService) {}
  reportData : any;
  termData : any;
  departmentData : any;
  showSpinner : boolean = false;
  showDialog : boolean = false;
  showReport : boolean = false;
  title = 'Booklist';
  //url parameters
  urlParams : any = {'termId' : null, 'departmentId' : null };
  locationId = "21944";
  termId = "";
  departmentId = "";

  runReport() {
    this.showDialog = false;
    this.showSpinner = true;
    console.log(this.urlParams);
    this._booklistSevice.getReport(this.urlParams)
    .subscribe(data => {
    this.reportData = data.booklistLine;
    this.showSpinner = false;
    });
  }
  openInfoPage() {
    window.open( "https://support.gosidewalk.com/hc/en-us/articles/221873168-Test-this-article");
  }

//downloading and exporting data
  downloadReport() {
    this._booklistSevice.getReport(this.urlParams)
    .subscribe(data => 
      this.startDownload(data.booklistLine)
    )};

  startDownload(data: any[]) {
    var blob = new Blob([data], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  
  //Dialog stuff goes here
  openDialog() {
    this.showDialog = true;
    
  }
  closeDialog() {
    this.showDialog = false;
  }
 
 ngOnInit() {
   //the first input control we will load here with the page
   this.getTermItems();
   //then lets show the control dialog so we can set the parameters
   this.openDialog(); 
  }


//Input control stuff goes here
currentDropdownState: string;

@Input() url: string;
  @Output() titlesUrl: EventEmitter<string> = new EventEmitter<string>();
  dialogObject: any = {subject:null, action:null, url:null};
  @Output() catalogDialogs = new EventEmitter(); //for dialogs

  toggleDropdownState(currentState): void{
    this.currentDropdownState = currentState;
  }
  
//Term in control dialog
  selectedTermName = "";
  term : any = [];

  getTermItems() {
    this._booklistSevice.getTerm(this.locationId)
    .subscribe(data => {
      this.termData = data;
      if (this.termData[0]) {
        this.updateTermDropdown(this.termData[0])
      } else {
        alert("no term data passed into getTermItems function")
      }
      });
  }
  
  updateTermDropdown(term: any): void {
      if (term) {
        this.selectedTermName = term.name;
        this.urlParams.termId = term.id;       
        this.selectedDepartmentName = "--";
      }
      //now that we chose a term, lets load the departments
      this.getDepartmentItems();
  }
  
//Department in control dialog
selectedDepartmentName = '';
department : any[];

getDepartmentItems() {
  this._booklistSevice.getDepartment(this.urlParams.termId)
    .subscribe(data => {
      this.departmentData = data;
    });
}
  
updateDepartmentDropdown(department): void {
     if (department) {
     this.selectedDepartmentName = department.name;
     this.urlParams.departmentId = department.id;
     } else { alert("no department.")}
}
   departmentWipeout() {
    this.updateTermDropdown(this.term)
  }


//chart dialog
dashboardData : any;
 public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Is Required', 'Optional'];
  public barChartType:string = 'pie';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 80]}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


runDashboard() {
    this._booklistSevice.getReport(this.urlParams)
    .subscribe(data => {
    this.dashboardData = data.booklistLine;
    });
    
  }

openReport() {
  this.showReport = true;
  this.runDashboard();
}
closeReport() {
  this.showReport = false;
}




}