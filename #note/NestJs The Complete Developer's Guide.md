# NestJs The Complete Developer's Guide

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

### validations

![validations](images/2-07%20validations.jpg)

![validations](images/2-08%20validations.jpg)

![validations](images/2-09%20validations.jpg)

- `whitelist: true`: request body에 dto를 포함한 추가적인 property가 있는 경우 dto 빼고 나머지 버림

## Services

![services](images/3-01%20services.jpg)

![services](images/3-02%20services.jpg)

![services](images/3-03%20services.jpg)

![services](images/3-04%20services.jpg)

![services](images/3-05%20services.jpg)

![services](images/3-06%20services.jpg)

### Dependency Injection

![di](images/4-01%20di.jpg)

![di](images/4-02%20di.jpg)

![di](images/4-03%20di.jpg)

![di](images/4-04%20di.jpg)

#### 사용할 dependency(instance)를 어떻게 받을 것인가?(Inversion of Control)

- ❌ class를 받아서 instance를 만들어 쓴다
- ✅ 만들어진 instance를 받아서 쓴다.

![inversion of control](images/4-05%20ioc.jpg)

![inversion of control](images/4-06%20ioc.jpg)

![inversion of control](images/4-07%20ioc.jpg)

- TypeScript의 한계때문에 better approach를 사용하지만 나중에 best approach를 사용할 수 있는 workaround를 알려줄 것임. 하지만 좀 어려움

#### Dependency Injection behind the scenes

1. NestJS app을 실행하면(만들면) DI Container가 만들어짐
2. app 내 Controller를 제외한 모든 class와 그 dependency class들의 목록을 DI Container에 등록함(나중에 Controller의 instance를 만들때 사용하기 위해)
3. 이 후 app에서 Controller를 만들 때가 되면, DI Container에 Controller의 instance를 만들어달라고 요청함
4. DI Container는 Controller instance와 그에 필요한 모든 dependency들의 instance를 만들어 줌
   - constructor arguments를 보고 dependency를 따라 내려가다가 더이상 dependency가 없으면 거기서부터 역순으로 instance를 만들어 마지막으로 Controller의 instance를 만듬
   - 이 때 만든 dependency instance들의 목록을 DI Container에 따로 저장해두고 그 dependency가 필요한 class에서 재사용됨(공유됨)
   - 따라서 dependency의 instance들을 직접 만들 필요가 없음. DI Container가 해주니까(수 많은 `new class` 필요x)
   - `@Injectable()`: 이 class(보통 Service와 Repository)는 dependency가 될 것이니 DI Container에 등록하라고 표시함. Controller는 consuming only class이므로 표시x
   - `@Module({ providers: []})`: 다른 class에 dependency로 사용될 수 있는 것들 목록
![di container](images/4-08%20di%20container.jpg)

![di container](images/4-09%20di%20container.jpg)

#### DI between modules

- `providers` property 안에 Service들은 private -> 다른 Module에서 접근 불가
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

![create flow](images/6-05%20create%20flow.jpg)

![hooks](images/6-06%20hooks.jpg)

- hooks: Entity 안에 정의한 method. 특정시점에 자동으로 호출됨
- `Repository.create()`: entity data를 받아 entity 파일 안에 설정된 method 실행 후 entity instance를 return함
- `Repository.save()`: entity instance를 받아 DB에 반영함
- `Repository.save()`에 entity instance 모양의 literal object를 넣어도 되지만 `Repository.create()`를 사용하여 entity instance를 만들어야 entity file안에 hook(validation, log 등)들을 같이 실행할 수 있음

```ts
async update(id: number, attrs: Partial<User>) {
  //~~~
}
```

- `update(id, name, email, ...)`이 아닌 `Partial<User>` 사용
- `Repository.update(id)`에 body에서 받아온걸 object로 넣어 호출하지 않고, `Repository.save(Entity)` 사용 -> hooks를 호출하기 위해
- `Repository.delete(id)` 대신 `Repository.remove(Entity)` 사용

## Error 처리하기

![http errors](images/7-01%20http%20errors.jpg)

![http errors](images/7-02%20http%20errors.jpg)

- `NotFoundException`와 같은 http의 특정한 Error는 http를 제외한 다른 protocol과 호환되지 않음
  - 즉, 다른 protocol을 사용하는 Controller에서는 Service에서 던지는 Error를 잡지 못하기 때문에 적당한 reposonse도 보내지 못함
  - 따라서 다른 protocol을 사용하는 Controller에 재사용 불가능하며 해당 Controller에 직접 exception filter구현해야 함
- Error handling은 Service가 아닌 Controller에서 하는 것이 좋음
  - Service에서는 그냥 `null`을 return
  - `Controller.updateUser()`와 `Controller.removeUser()`에 대해서는 Service에서 Error handling하는 이유는 challenging해서(update나 remove가 반영 안 된 경우도 처리해야) 간단히 한 것뿐

## Response에서 password 제외시키기

### Nest Documentation에서 추천하는 방법

![exclude password](images/8-01%20exclude%20password.jpg)

- Entity에서 `@Exclude()`하고 Controller에서 `@UseInterceptors(ClassSerializerInterceptor)`

![exclude password](images/8-02%20exclude%20password.jpg)

- downside: route에 따라 다른 Entity를 사용하거나 Entity를 수정해서 response를 내보내고 싶을 때 대응이 안됨

### 여러 route에 대응할 수 있는 방법(Interceptors)

![exclude password](images/8-03%20exclude%20password.jpg)

![exclude password](images/8-04%20exclude%20password.jpg)

- 나가는 response에 interceptor를 걸어 DTO 적용하기
- NestJS는 항상 response를 내보내기 전에 Entity를 받아서 serialize JSON으로 만들어 response에 담아 내보내는데 그 중간을 가로채서 처리하는 것

## Interceptor

- NestJS Docs를 한번 읽어보자(<https://docs.nestjs.com/interceptors>)
- 들어오는 request 및 나가는 response에 모두 적용 가능
- Controller의 하나의 또는 모든 handler, 또는 globally 적용가능

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
```

- `ExecutionContext`: Information on the incoming request
- `CallHandler`: Kind of a reference to the request handler in our controller
- data: handler의 return value(User Entity object)
- `plainToClass(Class, object)`: object(Entity)를 받아 ClassTransformOptions rules에 따라 Class의 instance를 만들어 return(User Entity object -> UserDto instance)

### type any 줄이기

- `data`는 Decorator가 적용된 handler가 어떤 값을 return(`data`)할지 알기 힘듬 -> type 정하기 힘듬
- `dto`를 class만 받도록 함

  ```ts
  interface ClassConstructor {
    new (...args: any[]): {};
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
  - 사람들이 많이 쓰는 password를 모아 놓은 테이블을 input으로 hash function에 넣어 output들을 모아 database의 password와 대조해봄(사실상 확률 높은 무작위 입력이네)
  - 막는법: Salt 추가
