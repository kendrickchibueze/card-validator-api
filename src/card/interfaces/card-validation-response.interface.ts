import { CardBrand } from "../enums/card-brand.enum";

export interface ICardValidationResponse {
  isValid: boolean;
  brand: CardBrand;
  formattedCard: string;
}