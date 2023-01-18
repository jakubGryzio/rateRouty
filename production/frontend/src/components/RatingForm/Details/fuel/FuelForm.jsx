import React, { Fragment } from "react";
import FuelCategory from "./FuelCategory";
import useFetchRating from "../../hooks/useFetchRating";

const FuelForm = (props) => {
  const { guid, rating_id, userView } = props;
  const type = "fuel";
  const params = ["PB", "LPG", "ON"];

  const {
    firstState: pbPriceState,
    secondState: lpgPriceState,
    thirdState: onPriceState,
  } = useFetchRating(guid, rating_id, type, userView, params);
  const [pbPrice, setPBPrice] = pbPriceState;
  const [lpgPrice, setLPGPrice] = lpgPriceState;
  const [onPrice, setONPrice] = onPriceState;

  return (
    <Fragment>
      <FuelCategory
        type={"ON"}
        bgColor={"#39484d"}
        price={onPrice}
        stateHandler={setONPrice}
      />
      <FuelCategory
        type={"PB"}
        bgColor={"#76d4b5"}
        price={pbPrice}
        stateHandler={setPBPrice}
      />
      <FuelCategory
        type={"LPG"}
        bgColor={"#fd9179"}
        price={lpgPrice}
        stateHandler={setLPGPrice}
      />
    </Fragment>
  );
};

export default FuelForm;
