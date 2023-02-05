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

![decorators](images/2-04%20decorators.jpg)
![decorators](images/2-05%20decorators.jpg)
![decorators](images/2-06%20decorators.jpg)

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

![di between modules](images/4-10%20di%20between%20modules.jpg)
![di between modules](images/4-11%20di%20between%20modules.jpg)
![di between modules](images/4-12%20di%20between%20modules.jpg)

## Modules

![modules](images/5-01%20modules.jpg)
![modules](images/5-02%20modules.jpg)
