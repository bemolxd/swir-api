import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  database: 'app-database',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true, //dev
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../resources/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/resources/migrations',
  },
};
