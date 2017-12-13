export default class Datai18n {
  private options: string;
  constructor(optins?: string) {
    this.options = optins;
  }

  public render(): void {
    const data = this.getDataElement();
    data.forEach((element) => {
      const i18n = browser.i18n.getMessage(element.dataset.i18n);
      element.insertAdjacentText('afterbegin', i18n);
    });
  }

  private getDataElement(): HTMLDataElement[] {
    const dataName = this.options || '[data-i18n]';
    const data = document.querySelectorAll(dataName);
    return [...data] as HTMLDataElement[];
  }
}
