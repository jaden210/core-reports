import { Component }            from '@angular/core';
import { BooklistComponent }    from './booklist/booklist.component';
import { HTTP_PROVIDERS }       from '@angular/http';
import 'rxjs/Rx';
import { MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import { MD_BUTTON_DIRECTIVES}  from '@angular2-material/button';
import 'chartjs';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [BooklistComponent,
    MD_TOOLBAR_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_BUTTON_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})
export class AppComponent {
  title = 'pro Reports';
}
