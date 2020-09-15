import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
