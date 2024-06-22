const MiniModalOptionsPlan = () => {
  return (
    <div className="absolute w-[120px] right-[-20px] bg-[#F0F0F0]">
      <div className="flex flex-col items-start px-[10px] py-[5px] text-blackPrimary ">
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
