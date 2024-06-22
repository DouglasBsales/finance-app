const MiniModalOptionsPlan = () => {
  return (
    <div className="fixed right-2 bg-[#F0F0F0] ">
      <div className="flex flex-col px-[10px] py-[5px] items-start text-blackPrimary ">
        <button>
          <p className="text-sm">Editar</p>
        </button>
        <button>
          <p className="text-sm">Excluir plano</p>
        </button>
      </div>
    </div>
  );
};

export default MiniModalOptionsPlan;
