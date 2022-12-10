import { Button } from 'react-bootstrap';
import { FaStar, FaStepBackward } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEdit } from '../../../../redux/reducer/review/review.reducer';
import ImageCustom from '../../../commons/Layouts/Image';
import { isSelectorReview } from '../../../../redux/selectors/review/review.selector';
import { URL_SERVER } from '../../../../utils/urlPath';
import './style.css';

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const reviewSelector = useSelector(isSelectorReview);
  const reviewData = { ...reviewSelector };

  const backToManage = () => {
    dispatch(setIsEdit(false));
  };

  return (
    <>
      <div className="mt-2 p-4 detail-review container w-75 rounded">
        <div className="d-flex justify-content-between">
          <h2 className=" fs-5 fw-bold mb-4">
            Review about #{reviewData.products.id} - {reviewData.products.name}
          </h2>
          <span className="d-flex justify-self-end h-50 fw-bold">
            <p
              className={` text-center border-radius-2px ${reviewData.status === 'pending' ? 'bg-warning-100 text-warning p-2' : 'bg-success-100 text-success p-2'
              }`}
            >
              {reviewData.status === 'pending' ? 'pending' : 'Pushlised'}
            </p>
          </span>
        </div>
        <hr className="border border-1 opacity-50"></hr>
        <h2 className="mt-2 fs-5 fw-bold mb-3">Customer :</h2>
        <div className="mb-3 p-lr-10 d-flex gap-3 justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <div className="img-avatar ">
              <ImageCustom src={reviewData.customers.avatar} type='avatar' className="w-100 " />
            </div>
            <h1 className="fs-5 fw-bold">{`${reviewData.customers.last_name} ${reviewData.customers.first_name}`}</h1>
          </div>

        </div>


        <div className="row p-3">
          <div className="col-md-6 col-sm-12 ">
            <div className="d-inline-block ">
              <span className="fw-bold">Email : </span>
              <span>{reviewData.customers.email}</span>
            </div>
            <div className="d-inline-block  m-t-10">
              <span className="fw-bold">Phone :</span>
              <span>{reviewData.customers.phone}</span>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="d-inline">
              <span className="fw-bold">Address :</span>
              <span>{reviewData.customers.address}</span>
            </div>
            <div className="d-inline-block m-t-10">
              <span className="fw-bold">Gender :</span>
              <span>{reviewData.customers.gender}</span>
            </div>
          </div>
        </div>
        <hr className="border border-1 opacity-50"></hr>
        <h2 className="mt-2 fs-5 fw-bold mb-3">Review :</h2>
        <div className="d-flex flex-column gap-3 p-lr-10">
          <span className="d-flex">
            {Array.from(Array(reviewData.point), (e, i) => {
              return <FaStar key={i} className="text-danger" />;
            })}
          </span>
          <span className="text-secondary" style={{ fontSize: '13px' }}>
            {reviewData.created_date}
          </span>
          <p className="fs-6 text-secondary fw-bold">Comment :</p>
          <p>{reviewData.content}</p>
          {/* <img style={{ width: '150px', height: '150px' }} src={`${reviewData.image} `} /> */}
          {/* <div className="image-review"> */}
          <ImageCustom
            src={reviewData.image}
            className="image-review"
            style={{ width: '150px', height: '150px' }}
          />
          {/* </div> */}
        </div>
        <div className="d-flex justify-content-end">
          <Button
            id="product-save-cancel"
            onClick={backToManage}
            variant="outline-secondary"
            className="font-weight-bold"
          >

            Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;
