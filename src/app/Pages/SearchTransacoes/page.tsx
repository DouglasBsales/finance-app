import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import { HeaderSearchTransacoes } from "@/components/SearchTransacoesPage/HeaderSearchTransacoes";
import { faMagnifyingGlass, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchTransacoes() {
  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary pb-[100px]">
      <div className="w-full flex flex-col items-center h-[134px] bg-bluePrimary rounded-b-md overflow-x-hidden overflow-y-hidden px-[28px]">
        <HeaderSearchTransacoes />
      </div>
      <div className="w-[390px] px-7 pt-4">
        <div className="w-full flex  bg-white rounded-md">
          <input
            type="text"
            className="w-full h-10 rounded-md outline-none pl-[10px]"
            placeholder="Pesquisar"
          />
          <div className="flex justify-center items-center pr-[10px]">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-blackOpacity text-xl"
            />
          </div>
        </div>
        <div className="pt-[26px]">
          <p className="text-blackOpacity pb-2">Domingo 09/06/2024 </p>
          <div className="w-full flex justify-between bg-bluePrimary rounded-md">
            <div className="text-white pl-[14px] py-[15px]">
              <div>
                <p>Quanto entrou</p>
                <p className="font-semibold text-xl">R$ 1.500,00</p>
              </div>
              <div>
                <p>Quanto saiu</p>
                <p className="font-semibold text-xl">R$ 25,00</p>
              </div>
            </div>
            <div className="flex items-center pr-5">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-white text-[67px]"/>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-blaclOpacity font-medium text-xl">Transações</p>
          <CardsTransacoesPlan/>
        </div>
      </div>
    </div>
  );
}
