import { useUser } from '@clerk/clerk-react'
import { FinancialRecordForm } from './financial-record-form';
import { FinancialRecordList } from './financial-record-list';
import "./financial-record.css";
import { useFinancialRecords } from '../../contexts/financial-record-context';
import { useMemo } from 'react';

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const total = useMemo(() => {
        let totalAmt = 0;
        records.forEach((record) => {
            totalAmt += record.amount;
        });
        return totalAmt;
    }, [records]);

    return (
        <div className="dashboard-container">
            <h1>Welcome { user?.firstName }! Here are your finances:</h1>
            <FinancialRecordForm/>
            <div> Total Amount: ${total} </div>
            <FinancialRecordList/>
        </div>
    );
}