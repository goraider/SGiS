import { ClientStarterPage } from './app.po';

describe('client-starter App', function() {
  let page: ClientStarterPage;

  beforeEach(() => {
    page = new ClientStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
