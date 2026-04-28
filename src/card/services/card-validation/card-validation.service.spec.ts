import { Test, TestingModule } from '@nestjs/testing';
import { CardValidationService } from './card-validation.service';

describe('CardValidationService', () => {
  let service: CardValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardValidationService],
    }).compile();

    service = module.get<CardValidationService>(CardValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
