type StorageObject = browser.storage.StorageObject;

type StorageValue = browser.storage.StorageValue;

type ChangeDict = browser.storage.ChangeDict;

interface StorageLocal {
  [key: string]: StorageObject;
}

export default class Storage {
  private local: StorageLocal = {};
  constructor() {
    browser.storage.onChanged.addListener(this.onChanged.bind(this));
  }

  public async initialize(options?: {}): Promise<void> {
    const local = await browser.storage.local.get();
    const storage = { ...options, ...local };
    Object.assign(this.local, storage);
  }

  private onChanged(changes: ChangeDict): void {
    Object.keys(changes).forEach(key => this.local[key] = changes[key].newValue);
  }

  public get(key: string): StorageValue {
    return this.local[key];
  }

  public set(obj: StorageObject): void {
    Object.assign(this.local, obj);
    browser.storage.local.set(obj);
  }
}
