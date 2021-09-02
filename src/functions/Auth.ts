export type AuthToken = {
  [key: string]: string | null
  'access-token': string | null
  'client': string | null
  'uid': string | null
};

export type BasicAuthToken = {
  'Authorization': string
};

export type AuthHeaders = AuthToken & BasicAuthToken;

const defaultAuthToken: AuthToken = {
  'access-token': null,
  'client': null,
  'uid': null
};

export const getAuth = (): AuthHeaders => {
  const authToken: AuthToken  = defaultAuthToken;
  Object.keys(authToken).forEach((key) =>{
    authToken[key] = localStorage.getItem(key);
  })
  const basicAuthToken = getBasicAuth();
  const responseAuthToken = {...authToken, ...basicAuthToken};
  return responseAuthToken;
}

export const setAuth = (inputAuthToken: AuthToken) => {
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

export const getBasicAuth = (): BasicAuthToken => {
  const authStr: string = `${process.env.REACT_APP_SERVER_BASIC_USER}:${process.env.REACT_APP_SERVER_BASIC_PASSWORD}`;
  const encodedAuth = Buffer.from(authStr).toString('base64');
  return {Authorization: `Basic ${encodedAuth}`};
};