// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
    '@angular2-material': 'vendor/@angular2-material',
    'ng2-charts': 'vendor/ng2-charts',
    'chartjs': 'vendor/chart.js/dist/Chart.bundle.min.js',
    'color-name': 'vendor/color-name/index.js',
    'color-convert': 'vendor/color-convert/index.js',
    'chartjs-color': 'vendor/chartjs-color/dist/color.js',
    'chartjs-color-string': 'vendor/chartjs-color-string/color-string.js',
    'moment': 'vendor/moment/moment.js',
    'ag-grid-ng2': 'node_modules/ag-grid-ng2',
    'ag-grid': 'node_modules/ag-grid'
};

/** User packages configuration. */
const packages: any = {
    'ng2-charts': { defaultExtension: 'js', main: 'ng2-charts.js' },
    'chartjs': { defaultExtension: 'js', format: 'cjs' },
    'ag-grid-ng2': { defaultExtension: "js" },
    'ag-grid': { defaultExtension: "js" }
};


// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'card',
  'list',
  'sidenav',
  'toolbar',
  'input',
  'menu',
  'progress-circle',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/booklist',
  'app/tile-navigation',
  'app/error-handling',
  'app/booklist/booklist-dashboard',
  'app/booklist/booklist-control',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
