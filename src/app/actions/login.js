export const LOGIN = 'LOGIN';

export function login(Username, Password) {
    return { type: LOGIN, Username, Password  }
}