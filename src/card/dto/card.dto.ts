import { IsNotEmpty, IsString, Matches } from "class-validator";
import { BRAND_PATTERNS } from "../constants/brand-patterns";

export class CardDto {
  @IsString()
  @IsNotEmpty()
  @Matches(BRAND_PATTERNS.ALLOWED_INPUT_PATTERN, {
    message: 'Card number contains invalid characters.',
  })
  cardNumber!: string;
}