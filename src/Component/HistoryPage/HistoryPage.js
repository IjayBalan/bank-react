import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let HistoryPage = () => {
    let state = useSelector((p) => p.data);
    let navigate = useNavigate();
    let [profileDetail, setProfileDetail] = useState([]);
    
    useEffect(() => {
        let obj = state.Items.find((a) => a.IsLogin === true);
        setProfileDetail(obj);
        console.log(obj);
    }, [state]);
    
    let homepage = () => {
        navigate('/');
    }

    return (
        <div>
            <div style={{backgroundColor:"skyblue",width:"100%"}}>
                <div className="d-flex justify-content-between">
                <img className="col-6 col-md-5 col-lg-4 col-xl-4 m-2 " src="https://computergyaan.in/wp-content/uploads/2018/10/canara-bank-logo.jpg" alt="Logo" />
                <button className="col-4 col-md-2 col-lg-2 col-xl-1 m-4 m-md-5 m-xl-5 m-lg-5 btn btn-custom" style={{textAlign:"center",height:"10%",backgroundColor:'#FFBF00',borderColor:'#FFBF00'}} onClick={homepage} >HomePage</button>
                </div>
            </div>
            <div className="row">
                <p className="col-3" style={{ textAlign: "center" }}>Date</p>
                <p className="col-4" style={{ textAlign: "center" }}>Details</p>
                <p className="col-2" style={{ textAlign: "center" }}>Amount</p>
                <p className="col-3" style={{ textAlign: "center" }}>Balance</p>
            </div>
            {profileDetail.transactionHistory && profileDetail.transactionHistory.map((a, b) => {
                return (
                    <div className="row" key={b}>
                        <p className="col-3" style={{ textAlign: "center" }}>{a.newDate}</p>
                        <p className="col-4" style={{ textAlign: "center" }}>{a.type === "credit" ? "C" : "D"} / {a.bank} / {a.type === "credit" ? a.creditAccount : a.debitAccount} / {a.newTime}</p>
                        <p className="col-2" style={{ textAlign: "center" }}>{a.type === "credit" ? a.creditAmount : a.debitAmount}</p>
                        <p className="col-3" style={{ textAlign: "center" }}>{a.type === "credit" ? a.crebalance : a.debbalance}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default HistoryPage;
