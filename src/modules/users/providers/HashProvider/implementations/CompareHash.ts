import ICompareHash from '@modules/users/providers/HashProvider/interfaces/ICompareHash';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';

@injectable()
export default class CompareHash implements ICompareHash {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(payload: string, hashed: string): Promise<boolean> {
    return this.hashProvider.compareHasc(payload, hashed);
  }
}
