import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { ICardValidationResponse } from 'src/card/interfaces/card-validation-response.interface';
import { CardValidationService } from 'src/card/services/card-validation/card-validation.service';
import { CardDto } from '../../dto/card.dto';

@Controller('card')
export class CardController {

  constructor(private readonly cardValidationService: CardValidationService) {}  

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Body() request: CardDto): Promise<ICardValidationResponse> {
    const validationResult = await this.cardValidationService.validate(request.cardNumber);
    return {
      ...validationResult,
    };
  }
}
