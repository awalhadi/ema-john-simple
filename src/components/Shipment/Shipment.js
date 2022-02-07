import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [loggeninUser, setloggedinUser] = useContext(userContext);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="row d-flex justify-content-center mt-4">
      <fieldset className="shipmentForm">
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <input className="form-control mb-3 p-4" name="name" {...register("name", { required: true })} placeholder="Input Your Name" defaultValue={loggeninUser.displayName} />
          {errors.name && <span className="text-danger d-block">Name is required</span>}

          <input type="email" className="form-control mb-3 p-4" name="email" {...register("email", { required: true })}  placeholder="Input Your Email" defaultValue={loggeninUser.email}/>
          {errors.email && <span className="text-danger d-block">Email is required</span>}

          <input type="tel" className="form-control mb-3 p-4" name="mobile" {...register("mobile", { required: true })}  placeholder="Input Your mobile"/>
          {errors.mobile && <span className="text-danger d-block">Mobile Number is required</span>}


          {/* <input className="form-control mb-3 p-4" name="address" {...register("address", { required: true })}  placeholder="Input Your address" />
          {errors.address && <span className="text-danger d-block">Mobile Number is required</span>} */}
          <textarea name="address" className="form-control" {...register("address", { required: true })}  placeholder="Input Your address"></textarea>
          {errors.address && <span className="text-danger d-block">Mobile Number is required</span>}
          
          <input type="submit" />
        </form>

      </fieldset>

    </div>
  );
};

export default Shipment;