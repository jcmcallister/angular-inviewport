import { browser, element, by } from 'protractor';

describe('InViewport Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  beforeEach(() => browser.executeScript('window.scrollTo(0,0)'));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should display lib', () => {
    expect(element(by.css('p')).getText()).toContain('Amet tempor excepteur occaecat nulla.');
  });

  it('should show `not-in-viewport` class', () => {
    expect(element(by.css('p.not-in-viewport')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('p.not-in-viewport')).isPresent()).toBeFalsy();
  });

  it('should show `in-viewport` class', () => {
    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('p.in-viewport')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0,0)');
    expect(element(by.css('p.in-viewport')).isPresent()).toBeFalsy();
  });

  it('should run event handler `onInViewportChange`', () => {
    browser.executeScript('window.scrollTo(0, window.innerHeight/2)');
    expect(element(by.css('p.highlight')).isPresent()).toBeTruthy();

    browser.executeScript('window.scrollTo(0,0)');
    expect(element(by.css('p.highlight')).isPresent()).toBeFalsy();
  });

});