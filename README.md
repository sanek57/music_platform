# Backend

- MongoDB
  - npm i @nestjs/mongoose mongoose
- RestApi на NestJS

  - npm i -g @nestjs/cli
    - nest new [proj-name]
  - обертка над Express с раширением его возможностей
  - npm i -D @types/multer
    - работа с файлами
  - npm install --save @nestjs/serve-static
    - раздача статики

- npm i uuid

## NestJS

Модель MVC

### module

изолированный модуль приложения

@Module({
provider: [Services],
controllers: [Controllers]
imports: [OtherModules]
})
export class ...

### controllers

взаимодействие с запросами и ответами

- тип HTTP запроса
- работа с параметрами запроса

@Controller('/path')
export class ...

### service

работа с бизнес-логикой

- получить что то с БД
- как то обрабоатать и вернуть

@Injectable()
export class ...

---

# Frontend

- TS + React
- ReduxToolkit
- NextJS
- small SEO optimization
- работа с аудио файлами
