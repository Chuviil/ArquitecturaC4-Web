import React from 'react';
import {ResultsTable} from "@/components/ResultsTable";

export interface ResultsPageProps {
    searchParams: {
        contribuyente: boolean;
        puntos: number;
    };
}

const Page = ({searchParams}: ResultsPageProps) => {
    return (
        <div>
            <ResultsTable contribuyente={searchParams.contribuyente} puntos={searchParams.puntos}/>
        </div>
    );
};

export default Page;