import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domains/users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './utils/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt_secret,
      signOptions: { expiresIn: '7200s' },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
