import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionIsNotSetError, ConnectionOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    try {
      const isDev = config.get('NODE_MODE') == 'development' ? true : false;

      const dbConfig = {
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: isDev,
        logging: config.get('DB_LOGGING'),
      } as ConnectionOptions;

      return dbConfig;
    } catch (err) {
      return new ConnectionIsNotSetError(
        'Error when i try to connect to database :(',
      );
    }
  },
});
