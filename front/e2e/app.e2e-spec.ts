import { AppfrontPage } from './app.po';

describe('appfront App', () => {
  let page: AppfrontPage;

  beforeEach(() => {
    page = new AppfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
