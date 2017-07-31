import { TurnkeyAppPage } from './app.po';

describe('turnkey-app App', () => {
  let page: TurnkeyAppPage;

  beforeEach(() => {
    page = new TurnkeyAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
