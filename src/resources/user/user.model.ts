import {IUser} from "../../core/interfaces/user.interface";
import * as uuid from 'uuid';

export class UserModel implements IUser {
  constructor(
    public name: string,
    public age: number,
    public hobbies: string[],
    public id = uuid.v4(),
  ) {}

  // static toResponse(user: UserModel): UserModel {
  // 	const { id, name, age, hobbies } = user;
  // 	return { id, name, age, hobbies };
  // }
}
