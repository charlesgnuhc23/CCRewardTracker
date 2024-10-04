import mongoose from 'mongoose';

interface FinancialRecord {
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    onlineflag: string;
    overseasflag: string;
    creditcard: string
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    onlineflag: { type: String, required: true },
    overseasflag: { type: String, required: true },
    creditcard: { type: String, required: true },
});

const FinancialRecordModel = mongoose.model<FinancialRecord>('FinancialRecord', financialRecordSchema);

export default FinancialRecordModel;