import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FinancialRecord {
    id?: string;
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    onlineflag: string;
    overseasflag: string;
    creditcard: string
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    // updateRecord: (id: string, newRecord: Partial<FinancialRecord>) => void;
    // deleteRecord: (id: string) => void;
}



export const financialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined)

export const FinancialRecordsProvider = ({children} : {children: React.ReactNode}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch("http://localhost:5173/financial-records", {
            method: "POST", 
            body: JSON.stringify(record),
            headers: {
                'Content-Type': "application/json"
            }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {
            // todo
        }
    };

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(
            'http://localhost:5173/financial-records/getAllByUserID/${user?.id}'
        );

        if (response.ok) {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
    <financialRecordsContext.Provider value={{ records, addRecord }}>
        {""}
        {children}
    </financialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(financialRecordsContext);
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider")
    }

    return context;
};