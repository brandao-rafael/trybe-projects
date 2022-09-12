export const LOGIN = 'LOGIN';
export const EDIT_SCORE = 'EDIT_SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const editScore = (score, assertions) => ({
  type: EDIT_SCORE,
  payload: {
    score,
    assertions,
  },
});
