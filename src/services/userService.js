import User from '../models/UserModel';

export function getAllUsers() {
  return User.batchGet({
    PK: 'User',
  });
}

export function createUser(user) {
  return User.create(user);
}
