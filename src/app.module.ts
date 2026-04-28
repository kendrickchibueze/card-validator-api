import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardValidationService } from './card/card-validation/card-validation.service';
import { CardModule } from './card/card.module';

@Module({
  imports: [CardModule],
  controllers: [AppController],
  providers: [AppService, CardValidationService],
})
export class AppModule {}
