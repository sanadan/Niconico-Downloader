export default class FileName {
  public static replace(fileName: string): string {
    return fileName
      .replace(/\\/g, '￥')
      .replace(/:/g, '：')
      .replace(/\?/g, '？')
      .replace(/"/g, '”')
      .replace(/</g, '＜')
      .replace(/>/g, '＞')
      .replace(/\|/g, '｜')
      .replace(/(\/|\*)/g, '');
  }
}
