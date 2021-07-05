import * as userCtrl from '../controllers/userController';

const routes = [
  {
    url: '/users',
    method: 'GET',
    handler: userCtrl.getUsers,
  },
];

export default routes;
