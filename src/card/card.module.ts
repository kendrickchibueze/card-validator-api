import { Module } from '@nestjs/common';
import { CardValidationService } from './services/card-validation/card-validation.service';
import { CardController } from './controllers/card/card.controller';
import { CardController } from './controllers/card/card.controller';

@Module({
  providers: [CardValidationService],
  controllers: [CardController]
})
export class CardModule {}
