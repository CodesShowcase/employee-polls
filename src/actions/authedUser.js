export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

// Logout needed

export function logOutUser(id) {
	return {
		type: LOG_OUT_USER
	};
}