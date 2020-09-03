import { injectable, inject } from 'tsyringe';

import IGenerateHash from '@modules/users/providers/HashProvider/interfaces/IGenerateHash';
import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';

@injectable()
export default class GenerateHash implements IGenerateHash {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(payload: string): Promise<string> {
    return this.hashProvider.generateHash(payload);
  }
}
