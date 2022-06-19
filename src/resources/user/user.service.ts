import { IncomingMessage as Request, ServerResponse as Response } from 'http';
import {usersRepository, userRepository, createRepository, updateRepository, removeRepository} from './user.repository';
import * as uuid from 'uuid';
import { UserModel } from './user.model';

export const users = async (client: { req: Request; res: Response }) => {
  try {
    client.res.statusCode = 200;
    client.res.setHeader('Content-Type', 'application/json');

    const users = await usersRepository();

    return JSON.stringify(users);
  } catch (e) {
    client.res.statusCode = 500;

    return (<Error>e).message;
  }
};

export const user = async (
  client: { req: Request; res: Response },
  param: string
) => {
  try {
    if (!uuid.validate(param)) {
      client.res.statusCode = 400;
      throw new Error('Invalid user id');
    }
    const user = await userRepository(param);

    if (!user) {
      client.res.statusCode = 404;
      throw new Error('User do not exist');
    }

    client.res.statusCode = 200;
    client.res.setHeader('Content-Type', 'application/json');
    return JSON.stringify(user);
  } catch (e) {
    return (<Error>e).message;
  }
};

export const create = async (client: { req: Request; res: Response }) => {
  const rawUserBuffer: any = [];

  client.req;

  return new Promise<UserModel | string>(async (resolve, _reject) => {
    client.req.on('data', (ch) => {
      rawUserBuffer.push(ch);
    });

    client.req.on('end', async () => {
      try {
        const rawUser: UserModel = JSON.parse(
          Buffer.concat(rawUserBuffer).toString()
        );

        if (!rawUser.age || !rawUser.username || !rawUser.hobbies) {
          client.res.statusCode = 400;
          throw new Error('Invalid user information');
        }

        if (isNaN(rawUser.age) || (rawUser.hobbies.length && !check(rawUser.hobbies))) {
          client.res.statusCode = 400;
          throw new Error('Invalid user information');
        }

        const newUser = new UserModel(rawUser.username, rawUser.age, rawUser.hobbies);

        await createRepository(newUser);

        client.res.statusCode = 201;
        client.res.setHeader('Content-Type', 'application/json',)

        resolve(JSON.stringify(newUser));

      } catch (e) {
        resolve((<Error>e).message)
      }

    });
  });
};
function check(x: any[]) {
  return x.every(i => (typeof i === "string"));
}

export const update = async (client: { req: Request; res: Response }, param: string) => {
  const rawUserBuffer: any = [];



  return new Promise<UserModel | string>(async (resolve, _reject) => {
    client.req.on('data', (ch) => {
      rawUserBuffer.push(ch);
    });

    client.req.on('end', async () => {
      try {
        if (!uuid.validate(param)) {
          client.res.statusCode = 400;
          throw new Error('Invalid user id');
        }

        const rawUser: UserModel = JSON.parse(
            Buffer.concat(rawUserBuffer).toString()
        );

        if (!rawUser.age || !rawUser.username || !rawUser.hobbies) {
          client.res.statusCode = 400;
          throw new Error('Invalid user information');
        }

        if (isNaN(rawUser.age) || (rawUser.hobbies.length && !check(rawUser.hobbies))) {
          client.res.statusCode = 400;
          throw new Error('Invalid user information');
        }

        const user = await userRepository(param);

        if (!user) {
          client.res.statusCode = 404;
          throw new Error('User do not exist');
        }

        const updatedUser = await updateRepository(rawUser);

        console.log(updatedUser)

        client.res.statusCode = 200;
        client.res.setHeader('Content-Type', 'application/json',)

        resolve(JSON.stringify(updatedUser));

      } catch (e) {
        resolve((<Error>e).message)
      }

    });
  });
}

export const remove = async (
    client: { req: Request; res: Response },
    param: string
) => {
  try {
    if (!uuid.validate(param)) {
      client.res.statusCode = 400;
      throw new Error('Invalid user id');
    }

    const user = await userRepository(param);

    if (!user) {
      client.res.statusCode = 404;
      throw new Error('User do not exist');
    }

    await removeRepository(param);

    client.res.statusCode = 204;

    return 'OK'
  } catch (e) {
    return (<Error>e).message;
  }
};