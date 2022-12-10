import React, { useRef } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDetail, setIsEdit } from '../../../../redux/reducer/order/order.reducer';
import { orderByIdSelector, orderDetailByIdSelector } from '../../../../redux/selectors/order/order.selector';
import { formatter } from '../../../../utils/formatCurrency';
import PrintPDF from '../../../commons/Layouts/PrintPDF';
import { useReactToPrint } from 'react-to-print';
import './style.css';
import { FaPrint, FaStepBackward } from 'react-icons/fa';
import { ADDRESS_COMPANY, AVATAR_COMPANY, NAME_COMPANY, PHONE_COMPANY } from '../../../../utils/urlPath';

const OrderDetail = () => {
  const components = useRef();
  const handlePrint = useReactToPrint({
    content: () => components.current,
    documentTitle: 'emp-data',
    // onAfterPrint: () => alert(components.current),
  });
  const dispatch = useDispatch();
  const dataDetailOrderById = useSelector(orderDetailByIdSelector);
  const dataOrder = useSelector(orderByIdSelector);
  const backToOrder = () => {
    dispatch(setIsDetail(false));
  };
  return (
    <>
      <div className="row mb-3">
        <div className=" d-flex justify-content-end">
          <Button id="product-save-cancel" onClick={backToOrder} variant="outline-danger" className="m-r-12  font-weight-bold ">
            <FaStepBackward /> Back
          </Button>
          <Button
            variant="outline-success"
            className=""
            onClick={() => {
              dispatch(setIsEdit(true), dispatch(setIsDetail(false)));
            }}
          >
            Update Status
          </Button>

          <Button
            id="product-save-cancel"
            onClick={handlePrint}
            variant="secondary"
            className="font-weight-bold margin-left-12px  "
          >
            <FaPrint className="m-r-8"/>
            Print
          </Button>
        </div>
      </div>
      <div ref={components} className='p-l-20 p-r-20'>
        <hr className="border-cl-bill mt-10 "></hr>
        <div className="row order_detail_info_order ">
          <div className=" col-md-12 col-sm-12 mt-3">
            <div className='row p-lr-20'>
              <div className="col-md-4 col-sm-12 d-flex w-38 justify-content-between">
                <Image className='avatar-company' src={AVATAR_COMPANY}></Image>
                <div className='info-company'>
                  <h4 className='fw-bold p-b-5'>{NAME_COMPANY}</h4>
                  <span className='d-inline-block p-b-5'>Contact : {PHONE_COMPANY}</span>
                  <p className='p-b-5'>Address : {ADDRESS_COMPANY}</p>

                </div>
              </div>
              <div className="col-m-4 col-md-12">

              </div>
            </div>
            <div className="mt-1 p-3  container w-100">
              <div>
                <h1 className="mt-2 mb-4 font-30px fw-bold text-center ">INVOICE</h1>

                <hr className="border border-1 opacity-50"></hr>
                <div className="d-flex flex-column">
                  <div className=" row">
                    <div className="col-4 ml-3">
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Order ID :
                        <span>  #{dataOrder && dataOrder.order_id} </span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Customer Name :
                        <span> {dataOrder && dataOrder.customer_firstname + ' ' + dataOrder.customer_lastname} </span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                       Customer Phone : <span>0{dataOrder && dataOrder.customer_phone}</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Ship to : <span>{dataOrder && dataOrder.address_delivery}</span>
                      </h4>

                    </div>
                    <div className="col-4 total_order_detail">
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        ID Staff : <span> {dataOrder && dataOrder.staff_id}</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Staff name :
                        <span>{dataOrder && dataOrder.staff_firstname + ' ' + dataOrder.staff_lastname} </span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Discount : <span> {dataOrder && dataOrder.discount_value}%</span>
                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Total : <span> {dataOrder && formatter.format(dataOrder.total_price)}</span>
                      </h4>
                    </div>
                    <div className="col-3 total_order_detail">
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                       Order Date : {dataOrder && dataOrder.created_order_date}
                      </h4>
                      <h4 className="fs-6   mt-4 mb-1 font-weight-bold ">
                        Status:
                        <span>
                          {(() => {
                            if (dataOrder && dataOrder.status === 1) {
                              return <span className="text-warning">Wait for confirmation...</span>;
                            } else if (dataOrder.status === 2) {
                              return <span className="text-success"> Confirm !</span>;
                            } else if (dataOrder.status === 3) {
                              return <span className="text-info"> Delivery</span>;
                            } else if (dataOrder.status === 4) {
                              return <span className="text-success"> Successfully delivery</span>;
                            } else if (dataOrder.status === 5) {
                              return <span className="text-danger"> Delivery failed</span>;
                            } else if (dataOrder.status === 6) {
                              return <span className="text-success"> Successfully</span>;
                            } else {
                              return <span className="text-danger"> Failed</span>;
                            }
                          })()}
                        </span>

                      </h4>
                      <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                        Payment : <span> COD</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border border-1 opacity-50"></hr>
        <h1 className="mt-2 font-20px fw-bold text-center ">Purchase Order Details</h1>
        <Table striped bordered hover className='mb-5'>
          <thead>
          <tr>
            <th>Serial</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
          </tr>
          </thead>
          <tbody>
          {dataDetailOrderById.data !== undefined &&
            dataDetailOrderById.data.map((item, index) =>
              (
                <tr>
                  <td>{index+1}</td>
                  <td>
                    <span>{item.product_name}</span>
                    <div className=" col-3 image_detail_order">
                      <img src={item.image} width={100} height={100} alt="image_detail_order" />
                    </div>
                  </td>
                  <td>{item.amount}</td>
                  <td>{formatter.format(item.price)}</td>
                  <td>{formatter.format(item.price * item.amount)}</td>
                </tr>
              )
            )
          }
          <tr>
            <td colSpan={3}></td>
            <td><b>Tax</b></td>
            <td>$0</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td><b>Total</b></td>
            <td>{dataOrder && formatter.format(dataOrder.total_price)}</td>
          </tr>
          </tbody>
        </Table>

        <div className="signature d-flex justify-content-between p-lr-50 m-b-200">
          <div className="customer signature ">
            <span className='fw-bold'>Customer Signature</span>
          </div>
          <div className="customer signature">
            <span className='fw-bold'>Shop Representative</span>
          </div>
        </div>
        <hr className="border-cl-bill mt-5 "></hr>
      </div>
    </>
  );
};

export default OrderDetail;
