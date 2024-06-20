import Link from "next/link"

export const ButtonCreateAccount = ()=> {
    return (
    <div className="flex justify-end mt-[46px]">
        <div className="">
           <button className="px-4 py-2 border-2 border-bluePrimary rounded-md">
                <Link href="/CreateAccount" className="text-bluePrimary font-semibold">Criar conta</Link>
           </button>
        </div>
    </div>
)
}