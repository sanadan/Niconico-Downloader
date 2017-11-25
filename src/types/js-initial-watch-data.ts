namespace js_initial {
  export interface WatchData {
    ad: {};
    channel: undefined;
    community: undefined;
    context: {};
    lead: {};
    liveTopics: {};
    maintenance: undefined;
    owner: {};
    player: {};
    playlist: {};
    tags: undefined[];
    thread: {};
    video: Video;
    viewer: {};
  }

  interface Video {
    id: string;
    title: string;
    originalTitle: string;
    description: string;
    originalDescription: string;
    thumbnailURL: string;
    postedDateTime: string;
    originalPostedDateTime: undefined;
    width: number;
    height: number;
    duration: number;
    viewCount: number;
    mylistCount: number;
    translation: false;
    translator: undefined;
    movieType: string;
    badges: undefined;
    introducedNicoliveDJInfo: undefined;
    dmcInfo: undefined;
  }
}
