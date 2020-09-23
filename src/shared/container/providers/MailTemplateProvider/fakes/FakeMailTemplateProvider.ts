import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/interfaces/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider//dtos/IParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}