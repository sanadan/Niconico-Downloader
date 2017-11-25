import config from '../config/config';
import Filename from './Filename';

interface Downloads {
  url: string;
  title: string;
}

export default class Download {
  private download: Downloads;
  constructor(download: Downloads) {
    this.download = download;
  }

  public start(): void {
    const { url, title } = this.download;
    const filename = Filename.replace(title);
    browser.downloads.download({
      url,
      filename: `${filename}${config.FILENAME_EXTENSION}`,
    });
  }
}
