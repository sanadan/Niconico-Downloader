import Download from './Download';
import Message from './Message';
import Tab from './Tab';

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
    const data = await message.get();
    const title = data.json.video.title;
    const download = new Download({
      title,
      url: data.url,
    });
    download.start();
  }
}
