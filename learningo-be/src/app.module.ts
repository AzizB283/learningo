import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from './translation/translation.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LearningProgressModule } from './learning-progress/learning-progress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Desk@123',
      database: 'learningo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TranslationModule,
    UsersModule,
    AuthModule,
    LearningProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
