export const HeaderSearchTransacoes = () => {
  return (
    <div className="w-full pt-[66px]">
      <div className="flex justify-center items-center gap-[39px]">
        <button className="bg-white rounded-md">
          <p className="text-bluePrimary font-xl font-semibold py-[3px] px-2 ">
            Dia
          </p>
        </button>
        <p className="text-white font-xl ">Semana</p>
        <p className="text-white font-xl ">Mês</p>
        <p className="text-white font-xl ">Ano</p>
      </div>
    </div>
  );
};
