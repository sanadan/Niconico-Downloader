import config from '../config/config';

interface ActiveInfo {
  tabId: number;
  windowId: number;
}

export default class Tab {
  public callback: (tabId: number) => void;
  constructor(callback: (tabId: number) => void) {
    this.callback = callback;
    browser.tabs.onUpdated.addListener(this.onUpdated.bind(this));
    browser.tabs.onActivated.addListener(this.onActivated.bind(this));
  }

  private onUpdated(tabId: number, changeInfo: Tabs.Tab): void {
    if (changeInfo.status === 'complete') {
      this.updateActiveTab(tabId);
    }
  }

  private onActivated(activeInfo: ActiveInfo): void {
    this.updateActiveTab(activeInfo.tabId);
  }

  private async updateActiveTab(tabId: number): Promise<void> {
    const tabInfo = await browser.tabs.get(tabId);
    if (!config.URL_NICONICO_WATCH.test(tabInfo.url)) {
      return;
    }
    this.callback(tabId);
  }
}
