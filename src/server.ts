import {
  createServer,
  IncomingMessage as Request,
  ServerResponse as Response,
} from 'http';
import { Server } from 'http';
import { CONFIG } from './core/config';
import { userRoutes } from './resources/user/user.router';

export enum MTHTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const routing: { [k: string]: any } = {
  [MTHTypes.GET]: {
    '/': 'welcome to homepage',
    ...userRoutes[MTHTypes.GET],
  },
  [MTHTypes.POST]: {
    ...userRoutes[MTHTypes.POST],
  },
  [MTHTypes.PUT]: {
    ...userRoutes[MTHTypes.PUT],
  },
  [MTHTypes.DELETE]: {
    ...userRoutes[MTHTypes.DELETE],
  },
};

const types = {
  object: JSON.stringify,
  string: (s: string) => s,
  number: (n: number) => n + '',
  undefined: () => 'not found',
  function: (
    fn: (client: { req: Request; res: Response }, par: string) => void,
    par: string,
    client: { req: Request; res: Response }
  ) => fn(client, par),
};

const matching: any = {
  [MTHTypes.GET]: [],
  [MTHTypes.POST]: [],
  [MTHTypes.PUT]: [],
  [MTHTypes.DELETE]: [],
};

function getMatching(routing: { [k: string]: any }, type: MTHTypes) {
  for (const key in routing) {
    if (key.includes('*')) {
      const rx = new RegExp(key.replace('*', '(.*)'));
      const route = routing[key];
      matching[type].push([rx, route]);
      delete routing[key];
    }
  }
}
getMatching(routing[MTHTypes.GET], MTHTypes.GET);
getMatching(routing[MTHTypes.POST], MTHTypes.POST);
getMatching(routing[MTHTypes.PUT], MTHTypes.PUT);
getMatching(routing[MTHTypes.DELETE], MTHTypes.DELETE);

const router = (client: { req: Request; res: Response }) => {
  let par;
  let route = routing[<string>client.req.method][<string>client.req.url];

  if (!route) {
    for (let i = 0; i < matching[<string>client.req.method].length; i++) {
      const rx = matching[<string>client.req.method][i]!;
      par = (<string>client.req.url).match(rx[0]);
      if (par) {
        par = par[1];
        route = rx[1];
        break;
      }
    }
  }

  if (!route) {
    client.res.statusCode = 404;
  }

  const type = typeof route;
  // @ts-ignore
  const renderer = types[type];

  return renderer(route, par, client);
};

class AppServer {
  private readonly server: Server;

  constructor() {
    this.server = createServer();

    this.server.on('request', async (req: Request, res: Response) => {
      try {
        res.end(await router({ req, res }));

      } catch (e) {
        res.statusCode = 500;
        res.end('Oops: Something went wrong on the server side, please try again later or contact your administrator');
      }
    });
  }

  start() {
    this.server.listen(CONFIG.PORT, () => {
      console.log(`App is running on http://localhost:${CONFIG.PORT}`);
    });
  }
}

export default new AppServer();
