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

  termData: any;
  term: any = [];
  departmentData: any;
  department: any[];
  selectedDepartmentName = '';
  isDisabled: boolean = true;
  title = 'Booklist';
  locationId = "21944";
  currentDropdownState: string;
  //closebutton
  @Output() closeControl: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() activeData: any;

  toggleDropdownState(currentState): void {
    this.currentDropdownState = currentState;
  }

  getTermItems() {
    this._booklistSevice.getTerm(this.activeData.locationId)
      .subscribe(
      data => {
        this.termData = data;
        if (!this.activeData.termName) {
          this.updateTermDropdown(this.termData[0]);
        } else {
          this.getDepartmentItems();
          this.isDisabled = false;
        }
      });
  }

  updateTermDropdown(term: any): void {
    if (term) {
      this.activeData.termName = term.name;
      this.activeData.termId = term.id;
      this.selectedDepartmentName = "--";
      this.activeData.departmentName = "";
      this.activeData.departmentId = "";
      this.isDisabled = false;
    }
    //now that we chose a term, lets load the departments
    this.getDepartmentItems();
  }

  getDepartmentItems() {
    this._booklistSevice.getDepartment(this.activeData.termId)
      .subscribe(data => {
        this.departmentData = data;

      });
  }

  updateDepartmentDropdown(department): void {
    if (department) {
      this.selectedDepartmentName = department.name;
      this.activeData.departmentName = department.name;
      this.activeData.departmentId = department.id;
    } else { alert("no department.") }
  }

  departmentWipeout() {
    this.selectedDepartmentName = "--";
    this.activeData.departmentName = "";
    this.activeData.departmentId = "";
  }

  closeDialog(boolean) {
    this.closeControl.emit(boolean);
  }

  ngOnInit() {
    if (this.activeData.departmentName) {
      this.selectedDepartmentName = this.activeData.departmentName;
    } else this.selectedDepartmentName = "--";
    this.getTermItems();    
  }
}
