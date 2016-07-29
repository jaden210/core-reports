import { CoreReportsPage } from './app.po';

describe('core-reports App', function() {
  let page: CoreReportsPage;

  beforeEach(() => {
    page = new CoreReportsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
