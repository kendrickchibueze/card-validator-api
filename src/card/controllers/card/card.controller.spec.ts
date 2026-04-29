import { Test, TestingModule } from '@nestjs/testing';
import { CardValidationService } from 'src/card/services/card-validation/card-validation.service';
import { CardController } from './card.controller';

describe('CardController', () => {
  let controller: CardController;
  const mockCardValidationService = {
    validate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        {
          provide: CardValidationService,
          useValue: mockCardValidationService,
        },
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});