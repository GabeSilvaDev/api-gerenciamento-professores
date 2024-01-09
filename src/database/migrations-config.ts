import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config';

const database = new TypeOrmConfigService();

export const dataConfigMigrations = new DataSource(
  database.createTypeOrmOptions() as DataSourceOptions,
);
