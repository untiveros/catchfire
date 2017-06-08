import { CatchFirePage } from './app.po';

describe('catch-fire App', () => {
  let page: CatchFirePage;

  beforeEach(() => {
    page = new CatchFirePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
