import { UserService } from 'src/users/users.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { Repository } from 'typeorm';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('Users Service', () => {
  let usersService: UserService;
  let usersRepository: MockRepository;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    usersService = await moduleRef.get<UserService>(UserService);
    usersRepository = await moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    // expect(userService).toBe();
  });
  it.todo('User Service');
});
