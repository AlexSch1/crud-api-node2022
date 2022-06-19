import InMemoryDB, {USERS_TABLE} from '../../core/db/inMemoryDB';
import {UserModel} from "./user.model";

const usersRepository = async () => {
  return InMemoryDB.getAllEntities(USERS_TABLE);
}

const userRepository = async (id: string) => {
  return InMemoryDB.getEntity(USERS_TABLE, id)
}
const createRepository = async (newUser: UserModel) => {
  return InMemoryDB.createEntity(USERS_TABLE, newUser)
}

const updateRepository = async (newUser: UserModel) => {
  return InMemoryDB.updateEntity(USERS_TABLE, newUser)
}
const removeRepository = async (id: string) => {
  return InMemoryDB.removeEntity(USERS_TABLE, id);
}


export {
  usersRepository,
  userRepository,
  createRepository,
  updateRepository,
  removeRepository
}