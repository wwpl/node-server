// 参考
// https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.service.ts

export class CreateUserDto {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
  ) {}
}
