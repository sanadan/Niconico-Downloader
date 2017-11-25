import config from '../config/config';

export default class WatchData {
  public static get(): {} {
    const watchData = document.getElementById(config.WATCH_DATA);
    const dataApiData = watchData.getAttribute(config.DATA_API_DATA);
    const data = dataApiData.replace(/&quot/, '"');
    const json = JSON.parse(data);
    const video = document.getElementsByTagName('video');
    const url = video[0].src;
    return { json, url };
  }
}
