import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BRAND_PATTERNS } from 'src/card/constants/brand-patterns';
import { CARD_CONSTRAINTS } from 'src/card/constants/card-constraints';
import { CardBrand } from 'src/card/enums/card-brand.enum';
import { ICardValidationResponse } from 'src/card/interfaces/card-validation-response.interface';

@Injectable()
export class CardValidationService {

    constructor(@InjectModel('Card') private readonly cardModel: Model<any>) {}
    
    public async validate(rawCardNumber: string): Promise<ICardValidationResponse> {
        const { SANITIZATION_PATTERN } = BRAND_PATTERNS;
        const sanitized = rawCardNumber.replace(SANITIZATION_PATTERN, '');
       const result = {
        isValid: this.verifyChecksum(sanitized),
        brand: this.detectBrand(sanitized),
        formattedCard: this.maskCardNumber(sanitized),
        };

        await this.cardModel.create({
           cardNumber: result.formattedCard,
        });

        return result;
    }

    private verifyChecksum(digits: string): boolean {
        const { MIN_LENGTH, MAX_LENGTH, CHECK_BASE, DIGIT_LIMIT, WEIGHT_FACTOR } = CARD_CONSTRAINTS;
        if (digits.length < MIN_LENGTH || digits.length > MAX_LENGTH) return false;

        let runningTotal = 0;
        let applyWeight = false;

        for (let i = digits.length - 1; i >= 0; i--) {
        let currentDigit = parseInt(digits.charAt(i), 10);

        if (applyWeight) {
            currentDigit *= WEIGHT_FACTOR;
            if (currentDigit > DIGIT_LIMIT) {
              currentDigit -= DIGIT_LIMIT;
            }
        }

        runningTotal += currentDigit;
        applyWeight = !applyWeight;

        }
        return runningTotal % CHECK_BASE === 0;
    }

    private detectBrand(digits: string): CardBrand {
        if (BRAND_PATTERNS.VISA.test(digits)) return CardBrand.VISA;
        if (BRAND_PATTERNS.MASTERCARD.test(digits)) return CardBrand.MASTERCARD;
        if (BRAND_PATTERNS.AMEX.test(digits)) return CardBrand.AMEX;   
        return CardBrand.UNKNOWN;
    }

    private maskCardNumber(digits: string): string {
        const { VISIBLE_EDGE_LENGTH, WEIGHT_FACTOR, MASK_SYMBOL } = CARD_CONSTRAINTS;
        if (digits.length < VISIBLE_EDGE_LENGTH * WEIGHT_FACTOR) {
          return digits;
        }
        const prefix = digits.slice(0, VISIBLE_EDGE_LENGTH);
        const suffix = digits.slice(-VISIBLE_EDGE_LENGTH);
        return `${prefix}${MASK_SYMBOL}${suffix}`;
    }
}
