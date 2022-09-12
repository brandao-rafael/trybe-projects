const API_ERROR_CODE = 3;
const AMOUNT = 5;

export const getToken = async () => {
  const response = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const json = await response.json();
  return json.token;
};

export const getQuestions = async (questionAmount = AMOUNT, token) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${questionAmount}&token=${token}`,
  );
  const json = await response.json();
  if (json.response_code === API_ERROR_CODE) {
    throw new Error('token expired');
  }
  return json.results;
};
