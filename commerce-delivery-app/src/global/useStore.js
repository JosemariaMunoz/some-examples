import { useReducer } from 'react';

const initialState = {
  reservationOrders: [],
  orderList: [],
  selectedOrderId: '',
  orderItemData: [],
  numberOfTrucks: 0,
  shipmentQuantity: 0,
  idchannel: '',
  idaccount: '',
  warehouseId: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, initialized: action.value };
    case 'RESERVATION_ORDERS':
      return { ...state, reservationOrders: action.value };
    case 'ORDERS_LIST':
        return { ...state, orderList: action.value };
    case 'SELECTED_ORDER_ID':
      return { ...state, selectedOrderId: action.value };
    case 'ORDER_ITEM_DATA':
      return { ...state, orderItemData: action.value };
    case 'NUMBER_OF_TRUCKS':
      return { ...state, numberOfTrucks: action.value };
    case 'SHIPMENT_QUANTITY':
      return { ...state, shipmentQuantity: action.value };
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