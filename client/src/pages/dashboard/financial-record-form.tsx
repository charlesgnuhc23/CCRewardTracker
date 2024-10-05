import { useContext, useState } from "react";
import { useUser } from '@clerk/clerk-react';
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {

    const {user} = useUser();

    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [onlineflag, setOnlineFlag] = useState<string>("");
    const [overseasflag, setOverseasFlag] = useState<string>("");
    const [creditcard, setCreditCard] = useState<string>("");

    const { addRecord } = useFinancialRecords();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRecord = {
            userID: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            onlineflag: onlineflag,
            overseasflag: overseasflag,
            creditcard: creditcard,
        };

        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setCategory("");
        setOnlineFlag("");
        setOverseasFlag("");
        setCreditCard("");
    }

    return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Description: </label>
                <input type="text" required className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-field">
                <label>Amount: </label>
                <input type="number" step="0.01" required className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="form-field">
                <label>Spending Category: </label>
                <select required className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a Category</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Travel">Travel</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Gas Station">Gas Station</option>
                    <option value="Groceries">Grocery Store</option>
                    <option value="Hotels">Hotels</option>
                </select>
            </div>
            <div className="form-field">
                <label>Online/POS: </label>
                <select required className="input" value={onlineflag} onChange={(e) => setOnlineFlag(e.target.value)}>
                    <option value="">Online/POS</option>
                    <option value="Online">Online</option>
                    <option value="POS">POS</option>
                </select>
            </div>
            <div className="form-field">
                <label>Local/Overseas: </label>
                <select required className="input" value={overseasflag} onChange={(e) => setOverseasFlag(e.target.value)}>
                    <option value="">Local/Overseas</option>
                    <option value="Local">Local</option>
                    <option value="Overseas">Overseas</option>
                </select>
            </div>
            <div className="form-field">
                <label>Card Used: </label>
                <select required className="input" value={creditcard} onChange={(e) => setCreditCard(e.target.value)}>
                    <option value="">Select a Card</option>
                    <option value="HSBC Red Card">HSBC Red Card</option>
                    <option value="HSBC EveryMile">HSBC EveryMile</option>
                    <option value="AEON WakuWaku">AEON WakuWaku</option>
                </select>
            </div>
            <button type="submit" className="button">
                Add Record
            </button>
        </form>
    </div>
    )
}