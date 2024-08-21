// import {  } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { path as rootPath } from 'app-root-path';
import { join } from 'path';

config();

const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // migrations: ['src/**/migrations/*{.ts,.js}'],
  // entities: ['src/**/**/entities/*.entity{.ts,.js}'],
  // migrationsTableName: 'migrations',
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*.ts'],
  // autoLoadEntities: true,
  // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: __dirname + '/../database/migrations',
  // },
  // extra: {
  //   charset: 'utf8mb4_unicode_ci',
  // },
  synchronize: false,
  logging: true,
};

export const dataSource: DataSource = new DataSource(typeOrmConfig);