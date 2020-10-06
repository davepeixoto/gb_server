import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/interfaces/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
