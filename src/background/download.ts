import Filename from './Filename';

interface Downloads {
  url: string;
  fileName: string;
  saveAs?: boolean;
}

export default class Download {
  private static readonly FILENAME_EXTENSION = 'mp4';
  private options: Downloads;
  constructor(options: Downloads) {
    this.options = options;
  }

  public start(): void {
    const { url, fileName, saveAs = false } = this.options;
    browser.downloads.download({
      url,
      saveAs,
      filename: `${Filename.replace(fileName)}${Download.FILENAME_EXTENSION}`,
    });
  }
}
