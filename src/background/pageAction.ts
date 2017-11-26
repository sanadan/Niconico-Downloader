import Download from './Download';
import Message from './Message';
import Tab from './Tab';
import Thumbinfo from './Thumbinfo';

export default class PageAction extends Tab {
  constructor() {
    super(PageAction.show);
    browser.pageAction.onClicked.addListener(PageAction.onClicked);
  }

  private static show(tabId: number): void {
    browser.pageAction.show(tabId);
  }

  private static async onClicked(tab: Tabs.Tab): Promise<void> {
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
