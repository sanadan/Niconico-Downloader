export default class WatchData {
  public static get(): {} {
    const video = document.getElementsByTagName('video');
    const url = video[0].src;
    return url;
  }
}
