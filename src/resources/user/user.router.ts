import {users, user, create, update, remove} from "./user.service";

export const userRoutes = {
	'GET' : {
		'/api/users': users,
		'/api/users/*': user,
	},
	'POST': {
		'/api/users': create,
	},
	'PUT': {
		'/api/users/*': update,
	},
	'DELETE': {
		'/api/users/*': remove,
	}
}