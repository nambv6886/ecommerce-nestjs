import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { path as rootPath } from 'app-root-path';
import { join } from 'path';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    console.log('rootPath:', rootPath)
    return {
      type: 'mysql',
      host: configService.get('MYSQL_HOST'),
      port: parseInt(configService.get('DB_PORT'), 10),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      password: configService.get('DB_PASSWORD'),
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      entities: [join(rootPath, 'dist/**/**/*.entity{.ts,.js}')],
      migrations: [join(rootPath, 'dist/**/migrations/*{.ts,.js}')],
      // cli: {
      //   migrationsDir: __dirname + '/../database/migrations',
      // },
      // extra: {
      //   charset: 'utf8mb4_unicode_ci',
      // },
      synchronize: false,
      logging: true,
    }
  }
}
