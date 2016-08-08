import { Component, OnInit }                                from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass }        from '@angular/common';
import { MD_CARD_DIRECTIVES }                               from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES }                             from '@angular2-material/button';
import { ROUTER_DIRECTIVES, Router }                        from '@angular/router';
import { BooklistComponent }                                from '../booklist/booklist.component';

@Component({
  moduleId: module.id,
  selector: 'app-tile-nav',
  templateUrl: 'tile-navigation.component.html',
  styleUrls: ['tile-navigation.component.css'],
  directives: [MD_CARD_DIRECTIVES,
  MD_BUTTON_DIRECTIVES,
  ROUTER_DIRECTIVES,
  BooklistComponent
              ],
  providers: [
  ],
  
})
export class TileNavigationComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
