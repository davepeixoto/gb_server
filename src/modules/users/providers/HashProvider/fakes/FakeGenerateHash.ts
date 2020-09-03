import IGenerateHash from '@modules/users/providers/HashProvider/interfaces/IGenerateHash';

export default class FakeGenerateHash implements IGenerateHash {
  public async execute(payload: string): Promise<string> {
    return payload;
  }
}
