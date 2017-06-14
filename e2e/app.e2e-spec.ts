import { FinappPage } from './app.po';

describe('finapp App', () => {
  let page: FinappPage;

  beforeEach(() => {
    page = new FinappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
