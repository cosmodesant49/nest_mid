// src/users/user.entity.ts
export class User {
  id: number; // ID пользователя
  email: string;
  password: string; // Храните хешированный пароль
}
