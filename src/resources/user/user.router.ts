import {users, user, create, update, remove} from "./user.service";

export const userRoutes = {
	'GET' : {
		'/api/users': users,
		'/api/user/*': user,
	},
	'POST': {
		'/api/users': create,
	},
	'PUT': {
		'/api/user/*': update,
	},
	'DELETE': {
		'/api/user/*': remove,
	}
}