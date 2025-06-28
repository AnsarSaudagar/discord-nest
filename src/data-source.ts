import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'scrum',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Always false for migrations
  logging: true,
}); 