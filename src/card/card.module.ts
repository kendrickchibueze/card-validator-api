import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardController } from './controllers/card/card.controller';
import { CardSchema } from './schemas/card.schema';
import { CardValidationService } from './services/card-validation/card-validation.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  providers: [CardValidationService],
  controllers: [CardController]
})
export class CardModule {}
