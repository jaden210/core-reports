import { Component }                from '@angular/core';
import { HTTP_PROVIDERS }           from '@angular/http';
import 'rxjs/Rx';
import { ROUTER_DIRECTIVES, Router }from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES}     from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES}      from '@angular2-material/button';
import { ToolbarService }           from './toolbar.service';
import { TileNavigationComponent }  from './tile-navigation/tile-navigation.component';
import { BooklistComponent }        from'./booklist/booklist.component';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,
              MD_TOOLBAR_DIRECTIVES,
              MD_BUTTON_DIRECTIVES,
              TileNavigationComponent,
              BooklistComponent],
  providers: [HTTP_PROVIDERS,
              ToolbarService]
})

export class AppComponent {
  constructor(private _toolbarService: ToolbarService){}
  title = 'pro Reports';

  openControl() {
    this._toolbarService.showControl = true;
  }

  openDashboard() {
    this._toolbarService.showDashboard = true;
  }

  openInfoPage() {
    window.open(this._toolbarService.infoLink);
  }

  downloadReport() {
    this._toolbarService.doDownload = true;
  }
}
