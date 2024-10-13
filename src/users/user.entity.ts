// src/users/user.entity.ts
export class User {
  id: string; // ID пользователя должен быть строкой
  email: string;
  password: string; // Храните хешированный пароль
}
