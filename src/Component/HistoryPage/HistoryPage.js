import React, { useState, useEffect } from "react";
import { useSelector} from "react-redux";
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
                <div className="d-flex justify-content-between align-items-center">
                <img className="col-5 col-md-5 col-lg-4 col-xl-4 m-2 " src="https://computergyaan.in/wp-content/uploads/2018/10/canara-bank-logo.jpg" alt="Logo" />
                <button className="col-3 col-md-1 col-lg-1 col-xl-1 p-1 m-2 m-md-5 m-xl-5 m-lg-5 btn btn-custom" style={{textAlign:"center",height:"10%",backgroundColor:'#FFBF00',borderColor:'#FFBF00',fontSize:"10px"}} onClick={homepage} >Home Page</button>
                </div>
            </div>
            <div className="row" style={{width:"100%"}}>
                <p className="col-3 d-flex justify-content-center">Date</p>
                <p className="col-3 d-flex justify-content-center" >Details</p>
                <p className="col-3 d-flex justify-content-center" >Amount</p>
                <p className="col-3 d-flex justify-content-center" >Balance</p>
            </div>
            {profileDetail.transactionHistory && profileDetail.transactionHistory.map((a, b) => {
                return (
                    <div className="row" style={{width:"100%"}} key={b}>
                        <p className="col-3 d-flex justify-content-center">{a.newDate}</p>
                        <p className="col-3 d-flex justify-content-center">{a.type === "credit" ? "C" : "D"} / {a.type === "credit" ? a.creditBank : a.debitBank} / {a.type === "credit" ? a.creditAccount : a.debitAccount} / {a.newTime}</p>
                        <p className="col-3 d-flex justify-content-center">{a.type === "credit" ? a.creditAmount : a.debitAmount}</p>
                        <p className="col-3 d-flex justify-content-center">{a.type === "credit" ? a.crebalance : a.debbalance}</p>
                    </div>
                );
            })}
            <div className=" row d-flex justify-content-center " style={{marginTop:"60vh",width:"100%"}}>
                <div className="col-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3" style={{border:"1px solid",borderColor:"lightgray"}}>
                    <p className="d-flex justify-content-center align-items-center m-1" style={{color:"gray"}}> Note: Click HomePage to Go Back</p>
                </div>
            </div>
                
        </div>
    );
}
export default HistoryPage;
