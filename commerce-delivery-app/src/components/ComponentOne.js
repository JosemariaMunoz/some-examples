import React, { useEffect, useState } from 'react';

import {useIntl} from 'react-intl';

import { Paper } from '@material-ui/core';

import LiferayApi from '../common/services/liferay/api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import { Liferay } from "../common/services/liferay/liferay";


function ComponentOne(props) {

  const intl = useIntl();

  const { reservationOrders, orderList, idchannel, idaccount} = props.store;

  // Local
  //const cIdChannel = '56816';
  //const cIdAccount = '56905';

  // Demo
  //const cIdChannel = '42764';
  //const cIdAccount = '620649';

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentLanguage = Liferay.ThemeDisplay.getLanguageId();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);

  };
  
  useEffect(() => {
    function getReservationOrders(idChannel, idAccount){
      LiferayApi('/o/headless-commerce-delivery-order/v1.0/channels/'+idChannel+'/accounts/'+idAccount+'/placed-orders')
      .then((result) => {
          console.log("Get placed-orders");
          console.log(result);
          props.store.orderList = [];
          handleReservationOrders(result.data.items);

      })
      .catch(console.log)
    }

    getReservationOrders(idchannel, idaccount);
  }, []);

  function compare( a, b ) {
    if ( a.idOrder < b.idOrder ){
      return 1;
    }
    if ( a.idOrder > b.idOrder ){
      return -1;
    }
    return 0;
  }

   useEffect(() => {
    const getOrderItems = () =>{
      for (let akey in reservationOrders){
        getDetailsFromOrderItems(reservationOrders[akey].orderUUID, reservationOrders[akey].account, reservationOrders[akey].id);
      }

    }
    function getDetailsFromOrderItems(erc, account, id){
      LiferayApi('/o/headless-commerce-admin-order/v1.0/orders/by-externalReferenceCode/'+erc+'/orderItems')
      .then((result) => {
          console.log("Get order items");
          console.log(result);
          let cOrderItems = [];
          cOrderItems = loadDetailsFromOrder(result.data.items, erc, account, id);
          
          // console.log(cOrderItems);
          cOrderItems.forEach(item => {
            orderList.push(item);
          });

          orderList.sort( compare );

          handleOrderList(orderList);
      })
      .catch(console.log)
    }
    getOrderItems();
  }, [reservationOrders]);

  function loadDetailsFromOrder(data, erc, account, id){
      let arrTemp = [];
      for (let key in data){
          let opt = [];
          opt.idOrder = id
          opt.account = account
          opt.id = data[key].id
          opt.orderErc = erc;
          opt.erc = data[key].externalReferenceCode;
          opt.title = data[key].name[currentLanguage];
          opt.formattedQuantity = data[key].formattedQuantity
          opt.quantity = data[key].quantity
          arrTemp.push(opt);
      }
     return arrTemp;
  };

  function handleReservationOrders(value) {
    props.dispatch({ type: 'RESERVATION_ORDERS', value });
    
  }
  function handleOrderList(value) {
    props.dispatch({ type: 'ORDERS_LIST', value });
    
  }

  console.log('OrderList');
  console.log(orderList);

  function getOrderItemInfo(selectedOrderItemId, title){
    LiferayApi('/o/headless-commerce-admin-order/v1.0/orderItems/'+selectedOrderItemId)
    .then((result) => {
        console.log("Get getOrderItemInfo");
        console.log(result);
        handleOrderItemData(result.data);
    })
    .catch(console.log)
  }

  function handleOrderItemData(value, title) {
    props.dispatch({ type: 'ORDER_ITEM_DATA', value });
  }

  return (  

    <Paper>
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead
            sx={{ 
              backgroundColor: "#F4F1DE", 
              borderWidth: "2px", 
              padding: "4px",
              fontWeight: "bold"
            }}
          >
            <TableRow>
              <TableCell align="left"
                sx={{ 
                  fontWeight: "bold",
                  color: "#E07A5F"
                }}
              >Order Id</TableCell>
              <TableCell align="left"
                sx={{ 
                  fontWeight: "bold",
                  color: "#E07A5F"
                }}
              >Order Account</TableCell>
              <TableCell align="left"
                sx={{ 
                  fontWeight: "bold",
                  color: "#E07A5F"
                }}              
              >Order External Reference Code</TableCell>
              <TableCell align="left"
                 sx={{ 
                  fontWeight: "bold",
                  color: "#E07A5F"
                }}             
              >Item Title</TableCell>
              <TableCell align="left"
                sx={{ 
                  fontWeight: "bold",
                  color: "#E07A5F"
                }}              
              >Item Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {
                  getOrderItemInfo(row.id, row.title);
                  props.handleNext();
                }}
              >
                <TableCell 
                sx={{ 
                  height: '20px', 
                  width: '5%',
                  color: "#3D405B"
                }}
                align="left"
                component="th" scope="row">
                  {row.idOrder}
                </TableCell>
                <TableCell 
                sx={{ height: '20px', width: '10%', color: "#3D405B" }}
                align="left">{row.account}</TableCell>
                <TableCell 
                sx={{ height: '20px', width: '30%', color: "#3D405B" }}
                align="left">{row.orderErc}</TableCell>
                <TableCell 
                sx={{ height: '20px', width: '45%', color: "#3D405B" }}
                align="left">{row.title}</TableCell>
                <TableCell 
                sx={{ height: '20px', width: '10%', color: "#3D405B" }}
                align="left">{row.formattedQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
            style={{ paddingTop: '15px' }}
            sx={{
              '.MuiTablePagination-select': {
                marginTop: '-12px'
              },
              '.MuiSelect-icon': {
                marginTop: '-7px'
              },
              '.MuiTablePagination-actions': {
                marginTop: '-15px'
              },
              color:"#81B29A"
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </Paper>
  );
}

export default ComponentOne;
