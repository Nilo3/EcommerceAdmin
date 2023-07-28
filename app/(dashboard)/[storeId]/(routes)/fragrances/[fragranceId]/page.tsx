import prismadb from "@/lib/prismadb";
import { FragranceForm } from "./components/fragrance-form";

const FragrancePage = async ({
    params
}: {
    params: { fragranceId: string }
}) => {
    const fragrance = await prismadb.fragrance.findUnique({
        where: {
            id: params.fragranceId
        }
    });


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FragranceForm initialData={fragrance} />
            </div>

        </div>
    )
}


export default FragrancePage;