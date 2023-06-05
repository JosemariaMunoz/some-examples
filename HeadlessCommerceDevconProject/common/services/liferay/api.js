import * as SecureStore from 'expo-secure-store';
import * as AppNavigation from '../../util/AppNavigation';
import qs from "qs";
import pkceChallenge from 'react-native-pkce-challenge';
import { changeUser, deleteUser } from '../../state/actions/userActions';
import { changeLogin } from '../../state/actions/loginActions';
import { changeRoles, deleteRoles } from '../../state/actions/rolesActions';
import { loginStore, rolesStore, userStore } from '../../state/store';



const REACT_APP_API_PATH = 'http://192.168.1.183:8080';
//const REACT_APP_API_PATH = 'http://192.168.50.190:8080';
const REACT_APP_AUTH = 'id-9282c91f-18b7-a99d-3459-c8d3f74f3371';
const authTokenName = 'authToken';

const codes = pkceChallenge();
const code_verifier = codes.codeVerifier;
export let code_challenge = codes.codeChallenge;

const setAuth = async (data) => {
  const result = SecureStore.setItemAsync(authTokenName, JSON.stringify({
    access_token: data.access_token,
		expire_date: data.expires_in
			? Date.now() + 1000 * data.expires_in
			: null,
		refresh_token: data.refresh_token || null,
		token_type: data.token_type,
  })).then(res => res);

  if(!result){
    throw new Error('Error storing token.');
  }
  
  return result;
}

const getAuth = async () => {
  let auth = JSON.parse(await SecureStore.getItemAsync(authTokenName));
  if(!auth){
    return null;
  }

  if (auth.expire_date && Date.now() > auth.expire_date) {
    auth = await refreshToken(auth);
  }
  return auth;
}

const refreshToken = async (auth) => {
  const refreshedToken = await apiRequest('/o/oauth2/token', {
    body: qs.stringify({
      client_id: REACT_APP_AUTH,
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token,
      code_verifier
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }, false);

  if(refreshedToken && !refreshedToken['error']){
    await setAuth(refreshedToken);
    return refreshedToken;
  }

  return false;
}

export const checkRole = (roleName) => {
  const rolesAux = rolesStore.getState().roles;

  if(!rolesAux || rolesAux.length === 0){
    return false;
  }
  const rolesArray = JSON.parse(rolesAux);
  return rolesArray.find(role => role.name === roleName);
}

export const createUser = async(emailAddress, password, givenName, familyName) => {
  return apiRequest('/o/headless-admin-user/v1.0/user-accounts', 
  {
    body: JSON.stringify({
      emailAddress,
      password,
      "alternateName": givenName + familyName,
      givenName,
      familyName
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST'
  }).then(res => res.dateCreated)
  .catch(async e => { await logout(); AppNavigation.navigate('LoginAuthCode'); return false});
  
}

export const getAccounts = async() => {
  return apiRequest('/o/headless-admin-user/v1.0/accounts', 
  {
    method: 'GET'
  }).then(res => {
    console.log("Get Account Request");
    //console.log(res.items);
    return(res.items);
    //res.dateCreated
  })
  .catch(async e => { await logout(); AppNavigation.navigate('LoginAuthCode'); return false});
  
}

export const ValidateSessionWithCode = async(code) => {
  const redirect_uri = REACT_APP_API_PATH + "/home";
  
  await apiRequest('/o/oauth2/token', {
    body: qs.stringify({
      client_id: REACT_APP_AUTH,
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      code_verifier
    }), 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST'
  }, false).then(async res => {
    console.log(res);
    setAuth(res);
    loginStore.dispatch(changeLogin(true));
    const userInfo = await apiRequest('/o/headless-admin-user/v1.0/my-user-account');
    console.log(userInfo);
    userStore.dispatch(changeUser(userInfo.name));
    SecureStore.setItemAsync('userName', userInfo.name);

    rolesStore.dispatch(changeRoles(JSON.stringify(userInfo.roleBriefs)));
    SecureStore.setItemAsync('roles', JSON.stringify(userInfo.roleBriefs));
  });
}

export const logout = async () => {
  await SecureStore.isAvailableAsync(authTokenName).then(async res => {
    if(res){
      await SecureStore.deleteItemAsync(authTokenName);
      await SecureStore.deleteItemAsync('userName');
      await SecureStore.deleteItemAsync('roles');
    }
  });
  loginStore.dispatch(changeLogin(false));
  userStore.dispatch(deleteUser());
  rolesStore.dispatch(deleteRoles());
}

export const apiRequest = async (url, options = {}, checkAuth = true) => {
  const {
    body,
    contentType = 'application/json',
    data = {},
    headers,
    method = 'GET',
    ...otherOptions
  } = options;

  const request = {method};
  if (method === 'POST') {
    request.body = body || JSON.stringify(data);
  }

  const requestHeaders = {
    'Content-Type': contentType,
  };

  if(checkAuth){
    const auth = await getAuth();
    if(!auth){
      throw new Error('Please log in.');
    }
    
    requestHeaders.Authorization = `${auth.token_type} ${auth.access_token}`;
  }

  request.headers = {
    ...requestHeaders,
    ...headers,
  };

  const response = await fetch(REACT_APP_API_PATH + url, {
    ...request,
    ...otherOptions,
  });
  
  if (response.ok) {
    const responseContentType = response.headers.get('content-type');

    if (responseContentType === 'application/json') {
      return response.json();
    }
    else {
      return response.text();
    }
  } else {
    const text = await response.text();
    let error;

    try {
      error = JSON.parse(text);
    } catch (e) {
      error = text;
    }

    return error;
  }
}

export default apiRequest;

const getInitialData = async() => {
  if(await getAuth()){
    loginStore.dispatch(changeLogin(true));
    userStore.dispatch(changeUser(await SecureStore.getItemAsync('userName')));
    rolesStore.dispatch(changeRoles(await SecureStore.getItemAsync('roles')));
  } else {
    loginStore.dispatch(changeLogin(false));
    userStore.dispatch(deleteUser());
    rolesStore.dispatch(deleteRoles());
  }
}

getInitialData();