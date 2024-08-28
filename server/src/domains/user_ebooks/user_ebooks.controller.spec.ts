import { Test, TestingModule } from '@nestjs/testing';
import { UserEbooksController } from './user_ebooks.controller';
import { UserEbooksService } from './user_ebooks.service';

describe('UserEbooksController', () => {
  let controller: UserEbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEbooksController],
      providers: [UserEbooksService],
    }).compile();

    controller = module.get<UserEbooksController>(UserEbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
