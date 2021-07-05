import * as userService from '../services/userService';

export async function getUsers() {
  return [];
}

export async function createNewUser(data) {
  return userService.createUser(data);
}
