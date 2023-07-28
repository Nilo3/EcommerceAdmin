"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FragranceColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface FragrancesClientProps {
    data: FragranceColumn[]
}

export const FragrancesClient: React.FC<FragrancesClientProps>= ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Fragrances (${data.length})`}
                    description="Manage fragrances for your store" 
                />
                <Button onClick={() => router.push(`/${params.storeId}/fragrances/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="Api calls for Fragrances" />
            <Separator />
            <ApiList entityName="fragrances" entityIdName="fragranceId"/>
        </>
    )
}

