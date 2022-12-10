import { yupResolver } from '@hookform/resolvers/yup';
import Notiflix from 'notiflix';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { importSchema } from '../../../../adapter/wordhouse';
// import { addSchema } from '../../../../adapter/product';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { requireProduct } from '../../../../api/Admin/Product/productAPI';
import { importStorage } from '../../../../api/Admin/WareHouse';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsRequireImport } from '../../../../redux/reducer/product/product.reducer';
import { setIsImportStorage } from '../../../../redux/reducer/warehouse/warehouse.reducer';
import { productByIdSelector } from '../../../../redux/selectors';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import { BlockUI } from '../../../commons/Layouts/Notiflix';
import './style.css';
function RequireImport(props) {
  const productDetailById = useSelector(productByIdSelector);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(importSchema),
    defaultValues: {
      product_code: productDetailById.id,
      product_name: productDetailById.name,
    },
  });

  const dispatch = useDispatch();
  const typeOptionsProvider = [];
  if (props.listProvider !== null || props.listProvider !== undefined) {
    props.listProvider.data.map((item) => {
      typeOptionsProvider.push({ value: item.id, label: item.name });
    });
  }

  const onSubmit = async (data) => {
    // console.log(data);
    BlockUI('#root', 'fixed');
    const dataResult = {
      product_id: data.product_code,
      name: data.name,
      import_amount: data.import_amount,
      requirement_import: 1,
    };
    const result = await requireProduct(dataResult);
    Notiflix.Block.remove('#root');
    if (result === 200) {
      SuccessToast('Require Import successfully', 3000);
      backtoTableImport();
    } else if (result === 404) {
      ErrorToast('Require Import unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      handleSetUnthorization();
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  const backtoTableImport = () => {
    dispatch(setIsRequireImport(false));
  };

  const handleSetUnthorization = () => {
    dispatch(setExpiredToken(true));
    const token = getCookies('token');
    // dispatch(setIsLogin(false));
    dispatch(setExpiredToken(true));
    if (token) {
      deleteCookie('token');
    }
  };
  return (
    <>
      <div className=" edit_form d-flex justify-content-center">
        <Form className="font_add_edit_prduct" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <table align="center" border="0" className="table table-bordered mb-0">
            <tbody>
              <tr>
                <td with="15%">
                  <p className="font-weight-bold">Name</p>
                </td>
                <td width="85%">
                  <Form.Control id="name" type="text" maxLength="128" {...register('name')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors?.name?.message}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Product Code</p>
                </td>
                <td width="85%">
                  <Form.Control id="name" type="text" maxLength="128" {...register('product_code')} disabled />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors?.name?.message}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Product Name</p>
                </td>
                <td width="85%">
                  <Form.Control id="name" type="text" maxLength="128" {...register('product_name')} disabled />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors?.name?.message}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td with="30%">
                  <p className="font-weight-bold">Import quantity</p>
                </td>
                <td width="70%">
                  <Form.Control id="amount" type="number" maxLength="128" {...register('import_amount')} />
                  <div className="d-flex justify-content-between">
                    <small className="text-red font-weight-semi">{errors.amount?.message}</small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end p-2 mt-3">
            <Button
              id="product-save-btn"
              variant="danger"
              type="submit"
              className="font-weight-bold me-3"
              disabled={!isValid}
            >
              Import
            </Button>
            <Button
              id="product-save-cancel"
              onClick={() => backtoTableImport()}
              variant="outline-secondary"
              className="font-weight-bold"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default RequireImport;
