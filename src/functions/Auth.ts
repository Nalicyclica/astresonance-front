export type authToken = {
  [key: string]: string | null
  'access-token': string | null
  'client': string | null
  'uid': string | null
}

const defaultAuthToken: authToken = {
  'access-token': null,
  'client': null,
  'uid': null
}

export const getAuth = (): authToken => {
  const responseAuthToken: authToken = defaultAuthToken;
  Object.keys(responseAuthToken).forEach((key) =>{
    responseAuthToken[key] = localStorage.getItem(key);
  })
  return responseAuthToken;
}

export const setAuth = (inputAuthToken: authToken) => {
  Object.keys(inputAuthToken).forEach((key) =>{
    if(inputAuthToken[key]){
      localStorage.setItem(key, String(inputAuthToken[key]));
    }
  })
};

export const deleteAuth = () => {
  Object.keys(defaultAuthToken).forEach((key) =>{
    localStorage.removeItem(key);
  });
};