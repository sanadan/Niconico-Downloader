import Storage from '../common/Storage';
import { StorageOption } from '../constants/storage';

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export default class Options {
  private storage: Storage;
  constructor() {
    this.storage = new Storage();
  }

  public async initialize(): Promise<void> {
    await this.storage.initialize({
      fileName: StorageOption.TITLE,
      saveAs: false,
    });
    const from = document.getElementsByTagName('form');
    [...from].forEach(element => element.addEventListener('change', this.onChange.bind(this)));
  }

  public loadRadioStorage(): void {
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.TITLE) {
      (document.getElementById(StorageOption.TITLE) as HTMLInputElement).checked = true ;
      return;
    }
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.VIDEO_ID) {
      (document.getElementById(StorageOption.VIDEO_ID) as HTMLInputElement).checked = true;
      return;
    }
    if (this.storage.get(StorageOption.FILE_NAME) === StorageOption.VIDEO_ID_AND_TITLE) {
      (document.getElementById(StorageOption.VIDEO_ID_AND_TITLE) as HTMLInputElement).checked = true;
      return;
    }
  }

  public loadCheckboxStorage(): void {
    const saveAs = document.getElementById(StorageOption.SAVE_AS) as HTMLInputElement;
    saveAs.checked = this.storage.get(StorageOption.SAVE_AS) as boolean;
  }

  private onChange(event: HTMLElementEvent<HTMLInputElement>): void {
    const value = event.target.id;
    switch (value) {
      case StorageOption.TITLE: this.setStorage(StorageOption.FILE_NAME, value); break;
      case StorageOption.VIDEO_ID: this.setStorage(StorageOption.FILE_NAME, value); break;
      case StorageOption.VIDEO_ID_AND_TITLE: this.setStorage(StorageOption.FILE_NAME, value); break;
      case StorageOption.SAVE_AS: this.setStorage(StorageOption.SAVE_AS, event.target.checked); break;
      default: break;
    }
  }

  private setStorage(key: string, value: string | boolean): void {
    this.storage.set({ [key]: value });
  }
}
