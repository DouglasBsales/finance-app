import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardsPlans = () => {
  return (
    <div className=" w-[130px] rounded-md bg-white pl-3 pb-3">
      <div className="pt-4">
        <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
          <FontAwesomeIcon
            icon={faHouse}
            className="text-bluePrimary text-xl"
          />
        </div>
      </div>
      <div className="pt-4">
        <p className="text-blackPrimary font-semibold">House</p>
        <div className="flex gap-1">
          <p className="text-xs font-medium text-blackPrimary">R$ 31.4k</p>
          <p className="text-xs font-medium text-blackOpacity">/R$ 200k</p>
        </div>
      </div>
    </div>
  );
};

export default CardsPlans
