import * as userCtrl from '../controllers/userController';

const routes = [
  {
    url: '/users',
    method: 'GET',
    handler: userCtrl.getUsers,
  },
  {
    url: '/users',
    method: 'POST',
    handler: userCtrl.createNewUser,
  }
];

export default routes;
