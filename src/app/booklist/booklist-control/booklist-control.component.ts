import { Component, OnInit, Input, Output, EventEmitter, SimpleChange }   from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { BooklistService }                                  from '../booklist.service';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button';
import { MD_LIST_DIRECTIVES }                               from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-booklist-control',
  templateUrl: 'booklist-control-inline.component.html',
  styleUrls: ['booklist-control.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ]
})
export class BooklistControlComponent implements OnInit {
  constructor(private _booklistSevice: BooklistService) { }

  
  term: any = [];
  department: any[];
  selectedDepartmentName = '--';
  isDisabled: boolean = true;
  currentDropdownState: string;
  termData: any = this._booklistSevice.termData;
  departmentData: any;
  activeData: any = {
    'locationId': this._booklistSevice.activeData.locationId,
    'termName': this._booklistSevice.activeData.termName,
    'termId': this._booklistSevice.activeData.termId,
    'departmentName': this._booklistSevice.activeData.departmentName,
    'departmentId': this._booklistSevice.activeData.departmentId
  };

  //closebutton
  @Output() closeControl: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleDropdownState(currentState): void {
    this.currentDropdownState = currentState;
  }

  formBuilder() {
    if (!this._booklistSevice.termData) {
      this._booklistSevice.getTerm()
        .subscribe(
        data => {
          this.termData = data;
          this.updateTermDropdown(this.termData[0]);  
        }); 
    } else {
      this.getDepartmentItems();
    }    
  }

  updateTermDropdown(term: any): void {
    if (term) {
      this.activeData.termName = term.name;
      this.activeData.termId = term.id;
      this.selectedDepartmentName = "--";
      this.activeData.departmentName = "";
      this.activeData.departmentId = "";
    }
    //now that we chose a term, lets load the departments
    this.getDepartmentItems();
  }

  getDepartmentItems() {
    this._booklistSevice.getDepartment(this.activeData.termId)
      .subscribe(data => {
        this.departmentData = data;
      });
    this.isDisabled = false;
  }

  updateDepartmentDropdown(department): void {
    if (department) {
      this.selectedDepartmentName = department.name;
      this.activeData.departmentName = department.name;
      this.activeData.departmentId = department.id;
    }
  }

  departmentWipeout() {
    this.selectedDepartmentName = "--";
    this.activeData.departmentName = "";
    this.activeData.departmentId = "";
  }

  closeDialog(boolean) {
    if (boolean) {
      this._booklistSevice.activeData = this.activeData;
      this._booklistSevice.doRun = true;
    };
    //we are only caching the termData because it is a required parameter
    this._booklistSevice.termData = this.termData;
    this.closeControl.emit(boolean);
  }

  ngOnInit() {
    this.formBuilder(); 
    //because the department is optional, we need to do this check to see if there is one and set the displayed name accordingly.
    //hopefully we can find a more efficient way of making an optional dropdown, but for now let's do this.
    if (this._booklistSevice.activeData.departmentName) {
      this.selectedDepartmentName = this._booklistSevice.activeData.departmentName;
    }
}
}
