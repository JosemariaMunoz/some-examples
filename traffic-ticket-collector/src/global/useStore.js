import { useReducer } from 'react';

const initialState = {
  initialized: false,
  idTrafficTicket: '',
  carRegistrationNumber: '',
  trafficTicketList: [],
  amount: '',
  creditCardNumber: '',
  expirationDate: '',
  cvc: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, initialized: action.value };
    case 'ID_TRAFFIC_TICKET':
        return { ...state, idTrafficTicket: action.value };
    case 'CAR_REGISTRATION_NUMBER':
      return { ...state, carRegistrationNumber: action.value };
    case 'TRAFFIC_TICKET_LIST':
      return { ...state, trafficTicketList: action.value };
    case 'AMOUNT':
      return { ...state, amount: action.value };
    case 'CREDIT_CARD_NUMBER':
      return { ...state, creditCardNumber: action.value };
    case 'EXPIRATION_DATE':
      return { ...state, expirationDate: action.value };
    case 'CVC':
      return { ...state, cvc: action.value };
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