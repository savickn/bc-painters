
import axios from './httpCaller';

// returns authToken to JSON object
export function getAuthToken() {
  return JSON.parse(localStorage.getItem('authToken'));
}

// saves authToken to localStorage + creates Authorization header
export function setAuthToken(token) {
  localStorage.setItem('authToken', JSON.stringify(token));
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// removes authToken from localStorage + deletes Authorization header
export function removeAuthToken() {
  localStorage.removeItem('authToken');
  axios.defaults.headers.common['Authorization'] = '';
}

// determines if user has correct permissions via roles 
export function hasPermission(user, permissionName) {
  if(!user || !user.roles) {
    return false;
  }

  let roles = user.roles;
  return roles.filter(role => role.permissions.filter(permission => permission.name === permissionName).length > 0).length > 0;
}




