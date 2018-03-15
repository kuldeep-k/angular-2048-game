import { NggamePage } from './app.po';

describe('nggame App', () => {
  let page: NggamePage;

  beforeEach(() => {
    page = new NggamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
