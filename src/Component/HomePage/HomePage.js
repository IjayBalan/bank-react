import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { updateDatas, IsLoginUpdate} from "../Redux/Slice";
import { useNavigate } from "react-router-dom";
let HomePage=()=>{
    let state=useSelector((p)=>p.data)
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let [profileDetail,setProfileDetail]=useState({})
    let [creditAmount,setCreditAmount]=useState()
    let [debitAccount,setDebitAccount]=useState()
    let [debitAmount,setDebitAmount]=useState()
    let [creditAccount,setCreditAccount]=useState()
    let [creditBank,setCreditBank]=useState()
    let [debitBank,setDebitBank]=useState()
    let [welcome,setWelcome]=useState("")
    useEffect(()=>{
        let obj=state.Items.find((a,b)=>{
            return a.IsLogin==true
        })
        setProfileDetail(obj)
        let now=new Date()
        let time=now.getHours()
        if(time<"12"){
            let a='GoodMorning'
            setWelcome(a)
        }else if(time<"15"){
            let b='GoodAfternoon'
            setWelcome(b)
        }else if(time<"18"){
            let c='GoodEvening'
            setWelcome(c)
        }else if(time<"24"){
            let d='GoodNight'
            setWelcome(d)
        }
    },[state])
    let handle=(e)=>{
        if(e.target.name==='creditAmount'){
        setCreditAmount(Number(e.target.value))
        }else if(e.target.name==='debitAccount'){
            setDebitAccount(e.target.value)
        }else if(e.target.name==='debitAmount'){
            setDebitAmount(Number(e.target.value))
        }else if(e.target.name==='creditAccount'){
            setCreditAccount(e.target.value)
        }else if(e.target.name==='creditBank'){
            setCreditBank(e.target.value)
        }else if(e.target.name==='debitBank'){
            setDebitBank(e.target.value)
        }
    }
    
    let addAmount=()=>{
        let updatedAmount=state.Items.map((a,b)=>a.IsLogin?({...a,initialAmount:(a.initialAmount+creditAmount)}):a)
        let crebalance=profileDetail.initialAmount+creditAmount
        let dateTime=new Date()
        let newDate=dateTime.toLocaleDateString()
        let newTime=dateTime.toLocaleTimeString()
        let type="credit"
        let dateTimeobj={newDate,newTime,creditAmount,type,creditAccount,creditBank,crebalance}
        setCreditAmount("")
        setCreditAccount("")
        setCreditBank("")
        let updateCreditTransaction = updatedAmount.map((a) =>a.IsLogin? {...a,transactionHistory: [...(a.transactionHistory),dateTimeobj]}: a);
        dispatch(updateDatas(updateCreditTransaction))  
    }
    let sendAmount=()=>{
         if(profileDetail.initialAmount>=debitAmount){
            let debitedAmount=state.Items.map((a,b)=>a.IsLogin?({...a,initialAmount:(a.initialAmount-debitAmount)}):a)
            let dateTime=new Date()
            let debbalance=profileDetail.initialAmount-debitAmount
            let newDate=dateTime.toLocaleDateString()
            let newTime=dateTime.toLocaleTimeString()
            let type="debit"
            let dateTimeobj={newDate,newTime,debitAmount,debitAccount,type,debitBank,debbalance}
            setDebitAmount("")
            setDebitAccount("")
            setDebitBank("")
            let updateDebitTransactions= debitedAmount.map((a)=>a.IsLogin?{...a,transactionHistory:[...(a.transactionHistory),dateTimeobj]}:a)
            dispatch(updateDatas(updateDebitTransactions)) 
         }
         else{
            alert("Insufficient Balance")
         }   
    }
    let logout=()=>{
       dispatch(IsLoginUpdate(false))
    }
    let history=()=>{
        navigate('/Transactions')
    }                                          

    return(
        <div>
            <div style={{backgroundColor:"skyblue",width:"100%"}}>
                <div className="d-flex justify-content-between">
                <img className="col-5 col-md-5 col-lg-4 col-xl-4 m-2 " src="https://computergyaan.in/wp-content/uploads/2018/10/canara-bank-logo.jpg" alt="Logo" />
                <button className="col-4 col-md-2 col-lg-2 col-xl-1 m-4 m-md-5 m-xl-5 m-lg-5 btn btn-custom" style={{textAlign:"center",height:"10%",backgroundColor:'#FFBF00',borderColor:'#FFBF00'}} onClick={history} >Transactions</button>
                <button className=" btn btn-danger col-1 m-4 m-md-5 m-xl-5 m-lg-5 d-flex justify-content-center align-items-center" style={{height:"10%"}} onClick={logout}>Logout</button>
                </div>
            </div>
            
            <div className="row d-flex justify-content-center" style={{width:"100%"}}>
                <p className="col-12 m-2 ms-3" style={{display:"flex"}}>{welcome} <h5 className="ms-1">{profileDetail.Name}</h5></p>
                <p className="col-12 ms-2" style={{display:"flex"}}>AccountNumber:<h5>{profileDetail.accountNo}</h5></p>
                <p className="col-12 ms-2" style={{display:"flex"}}>Current Balance:<h5>{profileDetail.initialAmount}</h5></p>
                <hr className="d-flex justify-content-between" style={{width:"90%"}}/>
                <div style={{backgroundColor:"skyblue",border:"1px",borderRadius:"2%",width:"60%",boxShadow:"0 4px 8px rgba(0,0,0,0.3)"}}>
                    <h3 className="mt-2" style={{textAlign:"center"}}>Credit</h3>
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add Bank</p>
                    <input className="d-flex justify-content-center" name="creditBank" value={creditBank} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add AccountNumber</p>
                    <input className="d-flex justify-content-center" name="creditAccount" value={creditAccount} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add Amount</p>
                    <input className="d-flex justify-content-center" name="creditAmount" value={creditAmount} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-success m-2" style={{width:"50%"}} onClick={addAmount}>Credit</button> 
                    </div>  
                </div>
                <hr className="mt-4 d-flex justify-content-between" style={{width:"90%"}}/>
                <div className="mb-4" style={{backgroundColor:"skyblue",border:"1px",borderRadius:"2%",width:"60%",boxShadow:"0 4px 8px rgba(0,0,0,0.3)"}}>
                    <h3 className="mt-2" style={{textAlign:"center"}}>Debit</h3>
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add Bank</p>
                    <input className="d-flex justify-content-center" name="debitBank" value={debitBank} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>                    
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add AccountNumber</p>
                    <input className="d-flex justify-content-center" name="debitAccount" value={debitAccount} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>
                    <p className="d-flex justify-content-center mt-3" style={{marginTop:"10%"}}>Add Amount</p>
                    <input className="d-flex justify-content-center" name="debitAmount" value={debitAmount} onChange={handle} style={{width:"100%",borderColor:"skyblue"}}/>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-success m-2" style={{width:"50%"}} onClick={sendAmount}>Debit</button> 
                    </div>  
                </div>
            </div>
            <div>
                <p></p>
            </div>
            <div className="d-flex justify-content-center m-2 ">
                <div style={{border:"1px solid",width:"60%",height:"40px",borderColor:"lightgray"}}>
                    <p className="d-flex justify-content-center align-items-center m-1" style={{color:"gray"}}> Note: Click Transactions to see the Transaction History</p>
                </div>
            </div> 
        </div>
    )
}
export default HomePage