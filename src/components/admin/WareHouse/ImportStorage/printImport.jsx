import React, { useRef } from 'react';
import { FaFileExport, FaFileImport, FaPen, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { importPrintSelector } from '../../../../redux/selectors';
import { formatDate } from '../../../../utils/formatDate';
import TableLayout from '../../../commons/Layouts/Table';
import './style.css';
import { setImportPrint } from '../../../../redux/reducer/warehouse/warehouse.reducer';
export function PrintImport(props) {
  const contentPrint = useSelector(importPrintSelector);
  const dispatch=useDispatch();
  const components = useRef();

  const handlePrint = useReactToPrint({
    // e.stopPropagation(),
    content: () => components.current,
    documentTitle: 'emp-data',
  });

  return (
    <>
      <div className="container" ref={props.current}>
        <div className="row justify-content-center">
          <div className="mt-1 p-3  container w-100">
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary d-flex justify-content-end margin-right-10px " onClick={()=>{
                dispatch(setImportPrint(false))
              }}>Cancel</button>
              <button className="btn btn-primary d-flex justify-content-end" onClick={handlePrint}>Print</button>
            </div>

            <div ref={components} className="print-style">
              <h1 className="mt-2 mb-4 font-30px fw-bold text-center ">Receipt</h1>
              <div className="d-flex flex-column">
                <div className=" row container">
                  <div className="col-md-2"></div>
                  <div className="col-4 ml-3">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Name :<span> {contentPrint !== undefined && contentPrint.name} </span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Provider name : <span>{contentPrint.providers.name}</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Phone: <span>{contentPrint.providers.phone}</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Address : <span>{contentPrint.providers.address}</span>
                    </h4>
                  </div>
                  <div className="col-4 total_order_detail">
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Product name :<span>{contentPrint.products.name} </span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Amount : <span>{contentPrint.import_amount}</span>
                    </h4>
                    <h4 className="fs-6  mt-4 mb-1 font-weight-bold ">
                      Create date : <span>{contentPrint.created_at}</span>
                    </h4>
                  </div>
                  <div className="col-md-2"></div>
                </div>
                <h3 className="text-center margin-top-10px">TRESOR</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
