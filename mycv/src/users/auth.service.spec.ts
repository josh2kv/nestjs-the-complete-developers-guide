import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  // 본격적으로 테스트하기 전 항상 AuthService와 fake users service를 만들도록 함
  // 테스트마다 새로운 instance를 사용하기 위해
  beforeEach(async () => {
    // Create a fake copy of the users service
    // AuthService에서 실제로  사용하는 method들만 선언하면 됨
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    // 임시 testing DI Container를 만듬
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    // testing DI Container에게 모든 dependency들이 적용된 새로운 AuthService instance를 만들어서 달라고 함
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@assdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // method를 덮어씌워 다른 response를 받을 수 있음
    fakeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    // for the last version from jest, you can't use `async/await , promise and done together.
    try {
      await service.signup('asdf@asdf@.com', 'asdf');
    } catch (error) {}
  });
});
