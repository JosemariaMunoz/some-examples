import { useReducer } from 'react';

const initialState = {
  initialized: false,
  firstName: '',
  lastName: '',
  emailAddress: '',
  typeOfBusiness: '',
  typeOfBusinessList:[],
  building: '170000', 
  improvements: '5000', 
  contents: '10000', 
  groundings: '17000', 
  liability: '100000', 
  degradation: '3',
  cpackage: '',
  packageList:[],
  coversList:[],
  totalPrice: 0,
  listCoversTotalPrice: [],
  existFireWater: false,
  coversSelectionList: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, initialized: action.value };
    case 'FIRST_NAME':
      return { ...state, firstName: action.value };
    case 'LAST_NAME':
      return { ...state, lastName: action.value };
    case 'EMAIL_ADDRESS':
      return { ...state, emailAddress: action.value };
    case 'TYPE_OF_BUSINESS':
      return { ...state, typeOfBusiness: action.value };
    case 'TYPE_OF_BUSINESS_LIST':
        return { ...state, typeOfBusinessList: action.value };
    case 'BUILDING':
        return { ...state, building: action.value };
    case 'IMPROVEMENTS':
      return { ...state, improvements: action.value };
    case 'CONTENTS':
      return { ...state, contents: action.value };
    case 'GROUNDINGS':
      return { ...state, groundings: action.value };
    case 'LIABILITY':
      return { ...state, liability: action.value };
    case 'DEGRADATION':
      return { ...state, degradation: action.value }; 
    case 'CPACKAGE':
      return { ...state, cpackage: action.value }; 
    case 'PACKAGE_LIST':
      return { ...state, packageList: action.value };                                 
    case 'COVERS_LIST':
      return { ...state, coversList: action.value };  
    case 'TOTALPRICE':
      return { ...state, totalPrice: action.value };  
    case 'LIST_COVERS_TOTALPRICE':
      return { ...state, listCoversTotalPrice: action.value };  
    case 'EXIST_FIRE_WATER':
      return { ...state, existFireWater: action.value };
    case 'COVERS_SELECTION_LIST':
      return { ...state, coversSelectionList: action.value };   
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

export default useStore;