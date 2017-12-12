import Fetch from './Fetch';

interface VideoInfo {
  title: string;
  videoId: string;
}

export default class Thumbinfo {
  public static readonly URL_THUMBINFO = 'http://ext.nicovideo.jp/api/getthumbinfo/';
  public static readonly XML_TAGNAME_TITLE = 'title';
  public static readonly XML_TAGNAME_VIDEOID = 'video_id';
  private url: string;
  constructor(url: string) {
    this.url = url;
  }
  public async get(): Promise<VideoInfo> {
    const xml = await this.getXml();
    const titleElement =  xml.getElementsByTagName(Thumbinfo.XML_TAGNAME_TITLE);
    const videoIdElement = xml.getElementsByTagName(Thumbinfo.XML_TAGNAME_VIDEOID);
    const title = titleElement[0].textContent;
    const videoId = videoIdElement[0].textContent;
    return { title, videoId };
  }
  private async getXml(): Promise<Document> {
    const start = 30;
    const videoId = this.url.substr(start);
    const thumbinfoUrl = `${Thumbinfo.URL_THUMBINFO}${videoId}`;
    const request = new Fetch(thumbinfoUrl);
    const xmlText = await request.get();
    const xml = Thumbinfo.parseXmlText(xmlText);
    return xml;
  }

  private static parseXmlText(xml: string): Document {
    const domParser = new DOMParser();
    const text = domParser.parseFromString(xml, 'application/xml');
    return text;
  }
}
