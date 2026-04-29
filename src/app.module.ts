import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import keys from './config/keys';

@Module({
  imports: [CardModule, MongooseModule.forRoot(keys.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
