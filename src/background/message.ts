interface Port {
  url: string;
  json: js_initial.WatchData;
}

export default class Message {
  private tabId: number;
  constructor(tabId: number) {
    this.tabId = tabId;
  }

  public async get(): Promise<Port> {
    const message = await browser.tabs.sendMessage(
      this.tabId,
      {},
    ) as Port;
    return message;
  }
}
