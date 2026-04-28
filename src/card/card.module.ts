import { Module } from '@nestjs/common';
import { CardController } from './controllers/card/card.controller';
import { CardValidationService } from './services/card-validation/card-validation.service';

@Module({
  providers: [CardValidationService],
  controllers: [CardController]
})
export class CardModule {}
