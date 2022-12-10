import React from 'react';
import { FaFileExport, FaFileImport, FaPen, FaPrint, FaTimesCircle } from 'react-icons/fa';
import { formatDate } from '../../../../utils/formatDate';
import TableLayout from '../../../commons/Layouts/Table';
import './style.css';
import { useDispatch } from 'react-redux';
import {
  setExportPrint,
  setExportPrintContent,
  setImportPrint,
  setImportPrintContent,
  setImportRequire,
  setImportRequireData,
} from '../../../../redux/reducer/warehouse/warehouse.reducer';
export function ExportTable(props) {
  const dispatch = useDispatch();
  const handlePrint = (data) => {
    dispatch(setExportPrint(true));
    dispatch(setExportPrintContent(data));
  };
  const handleUpdateImport = (data) => {
    dispatch(setImportRequire(true));
    dispatch(setImportRequireData(data));
  };
  const renderTableBodyRequired = () => {
    var i = 1;
    return props.tableBodyRequire.map((item, index) => {
      if (item.providers === null) {
        if (item.requirement_import === 1) {
          return (
            <tr key={item.id} className="cursor-pointer font-weight-bold">
              <td>{i++}</td>
              <td>{item.products.id}</td>
              <td>{item.name}</td>
              <td>{item.products.name}</td>
              <td>{item.import_amount}</td>
              {/* <td>{item.providers.name}</td> */}
              <td>{formatDate(item.created_at, 'YYYY-MM-DD')}</td>
              <td>
                <div className="d-flex">
                  <button
                    id="improt_product"
                    onClick={() => handleUpdateImport(item)}
                    className="br-6px p-2 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
                  >
                    <FaFileImport className="font-20px" />
                  </button>
                </div>
              </td>
            </tr>
          );
        } else {
          // <tr key={item.id} className="cursor-pointer font-weight-bold row-data"></tr>;
        }
      } else {
        return;
      }
    });
  };
  const renderTableBody = () => {
    return props.tableBody.map((item, index) => {
      return (
        <tr key={item.id} className="cursor-pointer font-weight-bold row-data">
          <td>{index + 1}</td>
          <td>{item.products.id}</td>
          <td>{item.provider_id}</td>
          <td>{item.products.name}</td>
          <td>{item.export_amount}</td>
          <td>{item.providers.name}</td>
          <td>{formatDate(item.created_at, 'YYYY-MM-DD')}</td>
          <td>
            <div className="d-flex">
              <button
                id="improt_product"
                onClick={() => handlePrint(item)}
                className="br-6px p-2 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaPrint className="font-20px" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <div className="row justify-content-center">
            <h1 className="text-center">Requirement to import goods</h1>
            <div className="table-headerrequire-import">
              <TableLayout tableHeader={props.tableHeaderRequirementImport} tableBody={renderTableBodyRequired()} />
            </div>

            <h1 className="text-center">Export history</h1>
            <div className="table-headerrequire-import">
              <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
