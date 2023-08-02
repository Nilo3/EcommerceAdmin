import prismadb from "@/lib/prismadb"
import { FragrancesClient } from "./components/client"
import { FragranceColumn } from "./components/columns";
import { format } from "date-fns"


const FragrancesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const fragrance = await prismadb.fragrance.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedFragrances: FragranceColumn[] = fragrance.map((item)=>({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FragrancesClient data={formattedFragrances} />
            </div>
        </div>
    )
}

export default FragrancesPage