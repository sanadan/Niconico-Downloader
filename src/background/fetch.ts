export default class Fetch {
  private input: RequestInfo;
  private init: RequestInit;
  constructor(input: RequestInfo, init: RequestInit = {}) {
    this.input = input;
    this.init = init;
  }
  public async get(): Promise<string> {
    try {
      const response = await fetch(this.input, this.init);
      return await response.text();
    } catch (error) {
      return error;
    }
  }
}
