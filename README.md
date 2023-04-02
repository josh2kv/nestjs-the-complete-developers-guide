# NestJS: The Complete Developer's Guide

Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!

![thumbnail](https://img-c.udemycdn.com/course/240x135/4174580_dd1c.jpg)

- Creator: Stephen Grider
- Platform: Udemy
- [Course Link](https://www.udemy.com/course/nestjs-the-complete-developers-guide/)

## NestJS

### NestJS를 사용하는 이유

![why nestjs](images/1-01%20nestjs.jpg)

## NestJS core packages의 역할

![core packages](images/1-02%20nestjs.jpg)

## Server frameworks in NestJS

![server frameworks](images/1-03%20nestjs.jpg)

## Parts of NestJS

![server flow](images/1-04%20nestjs.jpg)

![parts of NestJS](images/1-05%20nestjs.jpg)

## Conventions

![conventions](images/1-06%20nestjs.jpg)

## Decorators

![decorators](images/2-01%20decorators.jpg)

![decorators](images/2-02%20decorators.jpg)

![decorators](images/2-03%20decorators.jpg)

## Controllers

![controllers](images/2-04%20controllers.jpg)

![controllers](images/2-05%20controllers.jpg)

![controllers](images/2-06%20controllers.jpg)

### Validations

- class-transformer: request body로 들어온 key와 value만 담긴 plain JSON(object)를 그 key와 value를 포함하는 property들과 method들까지 넣어서 해당 class의 instance로 바꿔줌
- class-validator: class-transformer가 만들어준 instance의 각 property를 decorator로 설정한 constraint에 따라 validation하고 그 결과를 validation pipe로 둘려줌
![validations](images/2-07%20validations.jpg)

- 1을 하고 필요한 곳마다 2~4를 추가해 줌

![validations](images/2-08%20validations.jpg)

![validations](images/2-09%20validations.jpg)

- `whitelist: true`: request body에 dto를 포함한 추가적인 property가 있는 경우 dto 빼고 나머지 버림

#### `@Body`나 `CreateMessageDto`는 type이니까 실제 앱(JS)을 실행할 때는 존재하지도 않을텐데 validation pipe는 어떻게 body가 `CreateMessageDto`로 바뀐다는 걸 아는걸까?

- `tsconfig.json`에서 `experimentalDecorators`와 `emitDecoratorMetadata`를 켜면 TS에서 JS로 compile시 일부 type정보를 남김

```ts
// in TS
export class MessageController {
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    // ...
  }
}

🔽

//in JS
__decorate([
  // @Post를 `createMessage()`에 적용
  common_1.Port(),
  // @Body를 `createMessage()`의 1번째 argument에 적용
  __param(0, common_1.Body()),
  // `__metadata()`: JS에 전달되는 type 정보
  __metadata("design:type", Function),
  // body의 type이 `CreateMessageDto`임을 알림
  __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
  __metadata("design:returntype", Function),
])
```

## Services

![services](images/3-01%20services.jpg)

![services](images/3-02%20services.jpg)

![services](images/3-03%20services.jpg)

![services](images/3-04%20services.jpg)

![services](images/3-05%20services.jpg)

![services](images/3-06%20services.jpg)

## ⭐ Inversion of Control(IoC)

- Class에서 사용할 dependency를 어떻게 받아 쓸 것인가?

- *Inversion of Control Principle*
  - If you want to have reusable code, you should write classes that do not create instances of their own dependencies on their own.
  - ❌ dependency(MessageRepository)를 import한 뒤 Class(MessageService) 안에서 dependency의 instance를 새로 만들어 Class 내부에 저장하여 사용함
  - ✅ 이미 어딘가(CI Container)에 만들어져 있는 dependency의 instance를 받아서(접근해서) 사용함
![inversion of control](images/4-05%20ioc.jpg)

- Best는 꼭 `MessageRepository`를 받을 필요 없이 `Repository`만 충족하면 되기 때문에 더 flexible 함
  - Test시 dependency에서 하는 일이 아주 heavy하거나 수많은 test를 수행해야 한다면 dependency를 그대로 쓰는 것보다, dependency 모양을 한 가벼운 fake dependency를 쓰는 것이 효율적임 -> Best는 이것이 가능
  - 즉, test 환경에서 효율적인 대체품을 사용할 수 있으면서 production 환경에서도 그대로 호환이 되니 참 좋음

![inversion of control](images/4-06%20ioc.jpg)

![inversion of control](images/4-07%20ioc.jpg)

- TypeScript의 한계때문에 better approach를 사용하지만 나중에 best approach를 사용할 수 있는 workaround를 알려줄 것임. 하지만 좀 어려움

## ⭐ Dependency Injection

![di](images/4-01%20di.jpg)

![di](images/4-02%20di.jpg)

![di](images/4-03%20di.jpg)

![di](images/4-04%20di.jpg)

> 💡 Inversion of Control(IoC) vs Dependency Injection(DI)
> DI는 IoC 원칙을 실현하는 여러 방법 중 하나의 디자인 패턴 또는 매커니즘
>
> - Dependency Injection
>   - 내부적으로 dependency(instance들)를 생성하고 관리하는 대신 외부의 어떤 object(DI Container)가 그의 dependency를 선언하고 그로부터 dependency를 주입받아 IoC를 달성하는 방법
> - Inversion of Control
>   - dependency를 관리하는 책임을 사용하는 object에서 중앙 entity로 inversion하는 디자인 원칙 또는 컨셉
>   - 이 entity는 instance 및 instance 간 dependency를 생성 및 관리하며 그 instance들을 필요로하는 다른 object에게 제공해줌
>   - IoC는 Service Locators, Template Method, Strategy, Observer, Factory Method 등과 같은 방법으로도 달성 가능
>
### Dependency Injection behind the scenes

1. NestJS app을 실행하면(만들면) DI Container가 만들어짐
2. app 내 Controller를 제외한 모든 class와 그 dependency class들의 목록을 DI Container에 등록함(나중에 Controller의 instance를 만들때 사용하기 위해)
3. 이 후 app에서 Controller를 만들 때가 되면, DI Container에 Controller의 instance를 만들어달라고 요청함
   - constructor arguments를 보고 dependency를 따라 내려가다가 더이상 dependency가 없으면(보통 Repository) 거기서부터 역순으로 instance를 만들어 마지막으로 Controller의 instance를 만듬
4. DI Container는 Controller instance와 그에 필요한 모든 dependency들의 instance를 만듬
   - 이 때 만든 dependency instance들의 목록을 DI Container에 따로 저장해두고 그 dependency가 필요한 class에서 재사용됨(공유됨)
   - 따라서 dependency의 instance들을 직접 만들 필요가 없음. DI Container가 해주니까(수 많은 `new` Class 필요x)
   - `@Injectable()`: 이 class(보통 Service와 Repository)는 dependency가 될 것이니 DI Container에 등록하라고 표시함. Controller는 consuming only class이므로 표시x
   - `@Module({ providers: []})`: 다른 class에 dependency로 사용될 수 있는 것들 목록
![di container](images/4-08%20di%20container.jpg)

![di container](images/4-09%20di%20container.jpg)

- 💡 DI는 편리한 test에서 가장 큰 강점을 가짐. 따라서 test를 하지 않는다면 굳이 DI를 쓸 필요가 없으며 NestJS가 적합하지 않을 수 있음
- 🚨 DI Container로부터 inject되는 dependency instance들은 같은 하나의 instance를 받아서 사용함(공유함). 따라서 하나뿐인 dependency instance가 함부로 변형되지 않도록 `private readonly`로 선언하는 것이 좋을 듯?

```ts
export class MessageController {
  constructor(
    private msgService: MessageService,
    private msgService2: MessageService,
    private msgService3: MessageService,
  ) {
    console.log(msgService === msgService2)  // true
    console.log(msgService === msgService3)  // true
  }
}
```

#### DI between modules

- `providers` 이 property 안에 Service들은 private -> 다른 Module에서 접근 불가
- `exports`: 다른 Module에서 접근할 수 있도록 함
![di between modules](images/4-10%20di%20between%20modules.jpg)

![di between modules](images/4-11%20di%20between%20modules.jpg)

![di between modules](images/4-12%20di%20between%20modules.jpg)

## Modules

![modules](images/5-01%20modules.jpg)

![modules](images/5-02%20modules.jpg)

## TypeORM

![typeORM](images/6-01%20typeORM.jpg)

### Database 연결하기

- `TypeOrmModule.forRoot()`: `AppModule`에서 DB에 한번 접속하고 나면 하위 모든 Module에서 그 연결이 공유되도록 함
- `synchronize: true`
  - 개발환경에서만 쓰임
  - entity structure를 자동으로 동기화함
  - table의 추가/수정/삭제, columes의 추가/수정/삭제 등에 자동으로 동기화
- database class 이름은 뒤에 'Entity'를 붙이기도 함 `User` or `UserEntity`

### Entity와 Repository 만들기

![typeORM](images/6-02%20typeORM.jpg)

- `imports:  [TypeOrmModule.forFeature([User])]`
  - Users Repository를 만듬
  - Service에서 TypeORM이 제공하는 Repository API를 사용할 수 있게함

### Repository 사용하기

```ts
@Injectable()
export class UsersService {
   constructor(@InjectRepository(User) private repo: Repository<User>) {}
   // ~~~
}
```

- `repo: Repository<User>`
  - `repo`는 `User` instance를 관장하는 `typeORM.Repository`의 instance가 될것임
  - `UserService` class에 `typeORM.Repository<User>`가 inject될 것임을 dependency injection system에 알림
  - 하지만 dependency injection system은 generic을 제대로 받아들이지 못함
- `@InjectRepository(User)`
  - generic type을 사용하기 위해 dependency injection system에 알림

#### hooks 적용하기

![app apis](images/6-03%20app%20apis.jpg)

![app apis](images/6-04%20app%20apis.jpg)

- validation pipe와 controller에서는 DTO를 사용하고, service와 repository에서는 entity를 사용

![create flow](images/6-05%20create%20flow.jpg)

![hooks](images/6-06%20hooks.jpg)

- hooks: Entity 안에 정의한 method. 특정시점에 자동으로 호출됨
- `Repository.create()`: entity data를 받아 entity 파일 안에 설정된 method 실행 후 entity instance를 return함
- `Repository.save()`: entity instance를 받아 DB에 반영함
- 🚨 `Repository.save()`에 object literal이 아닌 entity instance를 넣는 이유
  - object literal을 entity로 만들면서 entity안에 hooks들을 호출할 수 있기 때문
  - validation(by class-validator or custom method), log 등

- `update(id, name, email, ...)`이 아닌 `Partial<User>` 사용
- `Repository.update(id)`에 body에서 받아온걸 object로 넣어 호출하지 않고, `Repository.save(Entity)` 사용 -> hooks를 호출하기 위해

```ts
async update(id: number, attrs: Partial<User>) {
  //~~~
}
```

- `Repository.delete(id)` 대신 `Repository.remove(Entity)` 사용

### Associations

![associations](images/6-07%20associations.jpg)

- `OneToMany()`(user)는 데이터베이스에 영향x, `ManyToOne()`(report)만 해당 many Entity table에 one Entity column 만듬
![associations](images/6-08%20associations.jpg)

#### relation decorator의 parameters

- 첫번째: Entity를 그냥 넣지 않고 function으로 return하는 이유(`() => Report`)
  - circular dependency 문제 때문
  - 하나의 모듈(class)이 실행되는 시점에 다른 모듈은 `undefined`
- 두번째: 같은 Entity이면서 다른 종류의 여러 관계를 설정할 때 필요
![associations](images/6-09%20associations.jpg)

#### Many Entity에 붙은 One Entity serialize하기

```ts
// report.dto.ts
@Transform(({ obj }) => obj.user.id)
@Expose()
userId: number
```

## Error 처리하기

![http errors](images/7-01%20http%20errors.jpg)

![http errors](images/7-02%20http%20errors.jpg)

- 🚨 Error handling은 Service가 아닌 Controller에서 하는 것이 좋음
  - `NotFoundException`와 같은 http만의 특정한 Error는 http를 제외한 다른 protocol과 호환되지 않음
  - 즉, 다른 protocol을 사용하는 Controller에서는 Service에서 던지는 Error를 잡지 못하기 때문에 적당한 response도 보내지 못함
  - 따라서 Service에서 exception을 throw하면 다른 protocol을 사용하는 Controller에 재사용 불가능하므로 해당 Controller에 직접 exception filter구현해야 함
  - Service에서는 그냥 `null`을 return
    - `Controller.updateUser()`와 `Controller.removeUser()`에 대해서는 Service에서 Error handling하는 이유는 challenging해서(update나 remove가 반영 안 된 경우도 처리해야) 간단히 한 것뿐

## ⭐ the life cycle of a request inside NestJS

![life cycle of a request](images/8-00%20req-res-pipeline.jpg)
<https://stackoverflow.com/questions/72038893/nestjs-how-and-where-to-build-response-dtos>
>
간단한 버전
![life cycle of a request - simple](https://velog.velcdn.com/images%2Fharon%2Fpost%2Fe2587453-9aa2-4f2d-9ae4-0c8c024ed42f%2Fimage.png)
<https://velog.io/@haron/NestJS-Lifecycle-Events>

## Response에서 password 제외시키기

- controller가 service로부터 entity를 전달받아서 그대로 내보냄
![original](images/8-01-00%20exclude%20password.jpg)

### Using built-in interceptors(Nest Documentation에서 추천하는 방법)

- entity에서 `@Exclude()`하고 해당 route controller에서 `@UseInterceptors(ClassSerializerInterceptor)` 적용
  - `ClassSerializerInterceptor`: it takes the value returned by a method handler and apply the `instanceToPlain()` function from class-transformer
    - 그래서 `@Exclude()`에 `{toPlainOnly: true}`가 필요 없는 듯

![exclude password](images/8-01%20exclude%20password.jpg)

- downside: route에 따라 같은 controller가 같은 entity를 return 받지만 다르게 exclude를 적용시켜 response를 내보내고 싶을 때 대응이 안됨
  - admin route와 public route에 user info를 요청했을 때 다르게 response하고 싶을 때

  ![exclude password](images/8-02%20exclude%20password.jpg)

### Using custom interceptors(여러 route에 대응할 수 있는 방법)

- route에 따라 다른 DTO를 적용한 뒤 serialize시켜 내보냄
  - NestJS는 항상 response를 내보내기 전에 Entity를 받아서 serialize JSON으로 만들어 response에 담아 내보내는데 그 중간을 가로채서 처리하는 것

![exclude password](images/8-03%20exclude%20password.jpg)

![exclude password](images/8-04%20exclude%20password.jpg)

## Custom interceptors

- NestJS Docs를 한번 읽어보자(<https://docs.nestjs.com/interceptors>)
- 다른 framework의 middleware라고 봐도 무방
- 들어오는 request 및 나가는 response에 모두 적용 가능
- Controller의 하나의 또는 모든 handler, 또는 globally 적용가능

![custom interceptors](images/8-05%20interceptors.jpg)

### Interceptor 적용하기

```ts
/**
 * Object(Entity)를 받아서 Serialized JSON으로
 */
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    console.log('1) Im running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent 
        console.log('3) Im running before response is sent out', data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export class UsersController {
  @UseInterceptors(SerializeInterceptor)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    // ~~~
  }
}
```

- `ExecutionContext`: Information on the incoming request
- `CallHandler`: request Kind of a reference to the request handler in our controller(정확히 말하면 route handler는 아니고 RxJS의 Observable)
- `data`: handler의 return value(User Entity object)
- `plainToClass(Class, object)`: object(Entity instance)를 받아 `ClassTransformOptions rules`에 따라 instance(DTO instance)를 만들어 return(User Entity object -> UserDto instance)
  - `plainToClass()`는 deprecated -> `plainToInstance()` 사용
  - `excludeExtraneousValues: true`: exposing all your class properties as a requirement. -> 따라서 해당 DTO class의 모든 property에 `Expose()` 또는 `Exclude()`를 명시해줘야 함

#### 외부에서 DTO를 전달받도록 하기

- but, interceptor 넣는 코드가 너무 길고 3개나 import 필요

```ts
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

 // same
}

export class UsersController {
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  // same
}
```

#### custom decorator를 적용하여 코드 깔끔하게 만들기

- but, type `any`가 거슬림

```ts
export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  // same
}

export class UsersController {
  @Serialize(UserDto)
  @Get(':id')
  // same
}
```

#### DTO의 type을 Class로 제한하기(type `any` 줄이기)

- `data`는 Decorator가 적용된 handler가 어떤 값을 return(`data`: `any`)할지 알기 힘듬 -> type 정하기 힘듬
- 그래도 최소한 `string`이나 `number`따위가 아닌 class만 받도록 함

```ts
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  // same
}
```

## Authentication

![authentication flow](images/9-01%20auth.jpg)

- Users Module 안에 Auth Service를 따로 만들 것인가? 기존 Users Service에 같이 넣을 것인가?
  - 작은 app에서는 상관없지만 커질수록 AuthService를 따로 만드는 게 좋음(Auth와 관련된 여러 feature가 추가될 수 있기 때문에)

![authentication dependency](images/9-02%20auth.jpg)

### Hash Function

- input이 조금만 달라도 output은 완전히 달라짐
- output을 input으로 되돌릴 수 없음

![rainbow table attack](images/9-03%20auth.jpg)

- Rainbow Table Attack
  - 사람들이 많이 쓰는 password를 모아 놓은 테이블을 input으로 hash function에 넣어 output들을 모아 database의 password와 대조해봄(사실상 확률 높은 무작위 입력)
  - 막는법: Salt 추가

### Cookie And Session

![cookie and session](images/9-04%20cookie-session.jpg)

- NestJS의 tsconfig와 cookie-session package의 충돌이 있어 `import` 대신 `require`를 사용해야함
- `keys: ['some string']`: cookie를 encrypt하는데 사용됨
- session object에 값을 저장하거나 가져오기 위해 `@Session()` 사용
- session값(`session.userId`)이 변하지 않으면(같은 사용자가 다시 로그인 하면) set-cookie 하지 않음(response header에 cookie를 담지 않음)
- 🚨 `Repository.findOne(null)`하면 첫 번째 record return. 따라서 그전에 `null`이면 return하도록(혹은 에러처리) 해야함

![guard](images/9-05%20guard.jpg)

### Interceptor와 Decorator 조합하기

- `ExecutionContext`
  - wrapper로 감싸진 incoming request object
  - 단순히 request object로 불리지 않는 이유는 다양한 protocol의 incoming request(WebSocket incoming message, GRPC request, HTTP request 등)를 abstract하는데 쓰이기 때문에
  - 다양한 protocol의 request에 똑같이 잘 작동할 수 있는 code를 짤 수 있도록 해줌
- ParamDecorator의 return 값이 곧 parameter가 됨
- `data: never`
  - Decorator(`@CurrentUser()`)에서 넘겨지는 argument
  - argument를 받지 않을 것이므로 type을 `never`로 둠
    - `never` type: 이 variable에는 어떤 값도 할당될 수 없음

#### Interceptor를 사용해야 하는 이유

- Decorator는 직접 Service를 사용할 수 없기 때문
  - DI내 존재하는 instance들은 class 안 `constructor`에서 instance를 inject받아서 써야함
  - 근데 Decorator는 class가 아니므로 constructor가 없고 inject받을 수도 없음
![interceptor](images/9-06%20interceptor.jpg)

![interceptor](images/9-07%20interceptor.jpg)

- Decorator가 Service instance를 inject 받을 수 없으니까 Interceptor를 통해 우회해서 접근
- interceptor의 body에서 `request.currentUser` = user 해두면 decorator에서 `return request.currentUser` 가능
  - controller의 handler에서 `request.currentUser`에 접근하기 전에 interceptor에서 미리 값을 넣어둠
  - interceptor body(request를 받은 직후) -> `handler.handle()`(controller) -> interceptor return(response가 나가기 직전) 순으로 실행됨
  - `request.session.userId`에는 현재 user ID가 저장되고, `request.currentUser`에는 현재 user 정보가 저장됨
- 왜 interceptor와 decorator를 조합해서 씀? 그냥 interceptor만 쓰면 안됨?
  - 됨. 하지만 최종 목표는 current user를 return하는 decorator를 만드는 것
  - 그 것을 위해 interceptor를 사용한 것일 뿐 당연히 interceptor만 독립적으로 사용될 수 있음
  - `Request` Decorator를 사용할 수도 있지만 elegant하지 않음(`CurrentUser`라는 이름으로 목적을 명확히 나타낼 수 있음)

  ```ts
  whoAmI(@Request() request: Request) {
    const user = request.currentUser
    // ~~~
  }
  ```

- 전체 Controller에 공통으로 적용해야 하는 interceptor는 global로 넣자 -> `APP_INTERCEPTOR`

```ts
// in users.controller.ts
@UserInterceptors(CurrentUserInterceptor)
export class UsersController {
  // ~~~
}

🔽

// in users.module.ts
@Module({
 providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  // ...
})
```

### Guard

- `canActivate()` method를 가지며 이 method는 incoming request가 있을 때마다 호출됨

![guard](images/9-08%20guard.jpg)

- Interceptor처럼 scope별로 적용 가능
- injectable x(`providers`에 넣지x)

![guard](images/9-09%20guard.jpg)

### Middleware

#### current user 가져오는 위치

- current user를 가져오는 logic은 interceptor보다 middleware에 넣는 것이 좋음
  - route 전에 guard에서 사용할 수도 있으므로

```ts
// users.module.ts
export class UsersModule {
  configure(consumer: MiddleWareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}

```

#### library에서 가져온 type에 property 추가하기

- `req`는 express의 `Request` type이라 `currentUser`라는 property를 가지고 있지 않음 -> type error

```ts
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
```

## Testing

## Deployment

### Migration
