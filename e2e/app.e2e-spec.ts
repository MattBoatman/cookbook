import { CookbookPage } from './app.po';

describe('cookbook App', function() {
  let page: CookbookPage;

  beforeEach(() => {
    page = new CookbookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
