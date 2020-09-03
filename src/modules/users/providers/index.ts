import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/Strategies/BCryptHashProvider';

import IGenerateHash from '@modules/users/providers/HashProvider/interfaces/IGenerateHash';
import GenerateHash from '@modules/users/providers/HashProvider/implementations/GenerateHash';

import ICompareHash from '@modules/users/providers/HashProvider/interfaces/ICompareHash';
import CompareHash from '@modules/users/providers/HashProvider/implementations/CompareHash';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IGenerateHash>('GenerateHash', GenerateHash);
container.registerSingleton<ICompareHash>('CompareHash', CompareHash);
