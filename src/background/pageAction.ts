import config from '../config/config';
import Download from './Download';
import Message from './Message';
import Thumbinfo from './Thumbinfo';

interface ActiveInfo {
  tabId: number;
}

export default class PageAction {
  constructor() {
    browser.tabs.onUpdated.addListener(this.onUpdated.bind(this));
    browser.tabs.onActivated.addListener(this.onActivated.bind(this));
    browser.pageAction.onClicked.addListener(this.onClicked.bind(this));
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
    browser.pageAction.show(tabId);
  }

  private async onClicked(tab: Tabs.Tab): Promise<void> {
    const message = new Message(tab.id);
    const response = await message.get();
    const thumbinfo = new Thumbinfo(tab.url);
    const videoInfo = await thumbinfo.get();
    const download = new Download({
      title: videoInfo.title,
      url: response.url,
    });
    download.start();
  }
}
