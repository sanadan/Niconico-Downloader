import WatchData from './WatchData';

export default class Message {
  public static init(): void {
    browser.runtime.onMessage.addListener(Message.onMessage);
  }

  private static onMessage({}: {}, {}: {}, sendResponse: ({}: {}) => void): void {
    const json = WatchData.get();
    sendResponse(json);
  }
}
