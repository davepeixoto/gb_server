import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/StorageProvider/interfaces/IStorageProvider';

import DiskStorageProvider from '@shared/container/StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
