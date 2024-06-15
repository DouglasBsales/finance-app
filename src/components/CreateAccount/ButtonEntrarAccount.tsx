import Link from "next/link"


const ButtonEntrarAccount = () => {
  return (
    <div className="w-full flex justify-end mt-[46px] ">
    <div className="">
       <button className="px-4 py-2 border-2 border-bluePrimary rounded-md">
            <Link href="/Login" className="text-bluePrimary font-semibold">Entrar</Link>
       </button>
    </div>
</div>
  )
}

export default ButtonEntrarAccount
