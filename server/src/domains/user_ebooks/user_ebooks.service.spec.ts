import { Test, TestingModule } from '@nestjs/testing';
import { UserEbooksService } from './user_ebooks.service';

describe('UserEbooksService', () => {
  let service: UserEbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEbooksService],
    }).compile();

    service = module.get<UserEbooksService>(UserEbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
