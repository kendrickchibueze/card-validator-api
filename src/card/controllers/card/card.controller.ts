import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CardDto } from 'src/card/dto/card.dto';
import type { ICardValidationResponse } from 'src/card/interfaces/card-validation-response.interface';
import { CardValidationService } from 'src/card/services/card-validation/card-validation.service';

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
