import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CardBrand } from 'src/card/enums/card-brand.enum';
import { CardValidationService } from './card-validation.service';

describe('CardValidationService', () => {
  let service: CardValidationService;
  let model: any;

  const mockCardModel = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ _id: 'someid', ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardValidationService,
        {
          provide: getModelToken('Card'),
          useValue: mockCardModel,
        },
      ],
    }).compile();

    service = module.get<CardValidationService>(CardValidationService);
    model = module.get(getModelToken('Card'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should return isValid: true and brand: Visa for a valid Visa card', async () => {
      const validVisa = '4111 1111 1111 1111';
      const result = await service.validate(validVisa);
      expect(result.isValid).toBe(true);
      expect(result.brand).toBe(CardBrand.VISA);
      expect(result.formattedCard).toBe('4111********1111');
      expect(model.create).toHaveBeenCalled();
    });

   it('should return isValid: true and brand: Mastercard for a valid Mastercard', async () => {
      const validMastercard = '5105 1051 0510 5100'; 
      const result = await service.validate(validMastercard);

      expect(result.isValid).toBe(true);
      expect(result.brand).toBe(CardBrand.MASTERCARD);
    });

    it('should return isValid: false if the Luhn algorithm fails', async () => {
      const invalidCard = '4111 1111 1111 1112'; 
      const result = await service.validate(invalidCard);

      expect(result.isValid).toBe(false);
    });

    it('should return brand: Unknown if the prefix is unrecognized', async () => {
      const unknown = '9999 9999 9999 9999';
      const result = await service.validate(unknown);

      expect(result.brand).toBe(CardBrand.UNKNOWN);
      expect(result.isValid).toBe(false);
    });
  });
});