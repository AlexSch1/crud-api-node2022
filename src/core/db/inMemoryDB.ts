import { UserModel } from '../../resources/user/user.model';

export const USERS_TABLE = 'users';

type tableNames = typeof USERS_TABLE;
type tableTypes = UserModel;

interface MyDb {
  users: UserModel[];
}

class InMemoryDB implements MyDb {
  [USERS_TABLE]: UserModel[] = [];

  async getAllEntities<T extends tableNames>(
    tableName: T
  ): Promise<tableTypes[]> {
    return this[tableName];
  }

  async getEntity<T extends tableNames>(
    tableName: T,
    idEntity: string
  ): Promise<tableTypes | undefined> {
    return this[tableName].find(({ id }) => id === idEntity);
  }

  async createEntity<T extends tableNames>(
    tableName: T,
    user: tableTypes
  ): Promise<void> {
    this[tableName].push(user);
  }

  async updateEntity<T extends tableNames>(
    tableName: T,
    user: tableTypes
  ): Promise<tableTypes> {
    this[tableName] = this[tableName].map((dbUser) => {
      if (dbUser.id === user.id) {
        return {
          ...dbUser,
          ...user,
        };
      }

      return dbUser;
    });

    return user;
  }

  async removeEntity<T extends tableNames>(
    tableName: T,
    idEntity: string
  ): Promise<void> {
    this[tableName] = this[tableName].filter((dbUser) => dbUser.id !== idEntity);

  }
}

export default new InMemoryDB();
