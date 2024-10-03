import { useUser } from '@clerk/clerk-react'
import { FinancialRecordForm } from './financial-record-form';

export const Dashboard = () => {
    const { user } = useUser();
    return (
        <div className="dashboard-container">
            <h1>Welcome { user?.firstName }! Here are your finances:</h1>
            <FinancialRecordForm/>
        </div>
    )
}