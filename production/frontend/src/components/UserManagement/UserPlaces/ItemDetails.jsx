import React, { useRef } from "react";
import { formFactory } from "../../RatingForm/formFactory";
import RatePanel from "../../RatingForm/panel/RatePanel";
import Button from "../../common/Button";
import useDeleteRating from "./hooks/useDeleteRating";
import useUpdateRating from "./hooks/useUpdateRating";
import classes from "./style/ItemDetails.module.css";

const ItemDetails = (props) => {
  const { guid, type, id, toggleDetailsHandler } = props;
  const form = formFactory(type, guid, id);
  const selectedRateValue = useRef(null);
  const updateHandler = useUpdateRating({ guid, id });
  const deleteHandler = useDeleteRating({ guid, id });

  return (
    <li className={classes.detail__item}>
      <div className={classes.item__container}>
        <div className={classes.form}>{form}</div>
        <div className={classes.rateContainer}>
          <div className={classes.rate}>
            <RatePanel ref={selectedRateValue} />
          </div>
          <div className={classes.buttons}>
            <Button
              onClick={() => {
                toggleDetailsHandler();
                updateHandler();
              }}
              title={"Edytuj"}
            />
            <Button
              onClick={() => {
                toggleDetailsHandler();
                deleteHandler();
              }}
              title={"Usuń"}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemDetails;
