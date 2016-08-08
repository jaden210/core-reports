import { provideRouter, RouterConfig }   from '@angular/router';
import { TileNavigationComponent}        from './tile-navigation';
import { BooklistComponent }             from './booklist';
import { BooklistDashboardComponent}     from './booklist/booklist-dashboard';

const routes: RouterConfig = [
    { path: '',
      component: TileNavigationComponent 
    },

    { path: 'tile-nav',
      component: TileNavigationComponent 
    },

    { path: 'booklist',
      component: BooklistComponent, 
      
    },
    { 
            path: 'dashboard', 
            component: BooklistDashboardComponent
        }
];

export const appRouterProviders = [
    provideRouter(routes)
];


