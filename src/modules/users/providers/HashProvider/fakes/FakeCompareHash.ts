import ICompareHash from '@modules/users/providers/HashProvider/interfaces/ICompareHash';

export default class FakeCompareHash implements ICompareHash {
  public async execute(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
