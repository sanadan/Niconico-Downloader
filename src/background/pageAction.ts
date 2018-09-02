import Storage from '../common/Storage';
import { StorageOption } from '../constants/storage';
import Download from './Download';
import Message from './Message';
import Thumbinfo from './Thumbinfo';

interface ActiveInfo {
  tabId: number;
}

export default class PageAction {
  public static readonly URL_NICONICO_WATCH = /^https?:\/\/www\.nicovideo\.jp\/watch.*/;
  private storage: Storage;
  constructor() {
    this.storage = new Storage();
    browser.tabs.onUpdated.addListener(this.onUpdated.bind(this));
    browser.tabs.onActivated.addListener(this.onActivated.bind(this));
    browser.pageAction.onClicked.addListener(this.onClicked.bind(this));
  }

  public async initialize(): Promise<void> {
    await this.storage.initialize({
      fileName: 'title',
      saveAs: false,
    });
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
    if (!PageAction.URL_NICONICO_WATCH.test(tabInfo.url)) {
      return;
    }
    browser.pageAction.show(tabId);
  }

  private async onClicked(tab: Tabs.Tab): Promise<void> {
    const message = new Message(tab.id);
    const response = await message.get();
    const thumbinfo = new Thumbinfo(tab.url);
    const videoInfo = await thumbinfo.get();

    let fileName;
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.TITLE) {
      fileName = videoInfo.title;
    }
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.VIDEO_ID) {
      fileName = videoInfo.videoId;
    }
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.VIDEO_ID_AND_TITLE) {
      fileName = videoInfo.videoId + "_" + videoInfo.title;
    }
    const saveAs = this.storage.get(StorageOption.SAVE_AS) as boolean;
    const download = new Download({
      saveAs,
      fileName,
      url: response.url,
    });
    download.start();
  }
}
