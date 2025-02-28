import React, { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateDatas,IsLoginUpdate } from "../Redux/Slice";

let LoginPage = () => {
  let state = useSelector((p) => p.data);
  console.log(state);
  let dispatch=useDispatch()
  let [userId, setUserId] = useState("");
  let [password, setPassword] = useState();

  let handle = (e) => {
    if (e.target.name === "userId") {
      setUserId(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  let submit = () => {
    let newarray= state.Items.map((a,b)=> userId===a.userId && password===a.password ? {...a,IsLogin:true}:a)
    dispatch(updateDatas(newarray))
    
    let updateHomePage=state.Items.filter((a,b)=> userId===a.userId && password===a.password )
    if(updateHomePage.length!=0){ 
      dispatch(IsLoginUpdate(true))
    }
    else{alert("Invalid UserName or Password")}
    
  }

  return (
    <div style={{backgroundColor:"White", width:"100%", height:"100%"}}>
      <div className="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img style={{width:"40%",height:"30%",marginTop:"5%"}} src="https://th.bing.com/th/id/OIP.lCll6raXJdLpNIhLaqpVBQHaEo?rs=1&pid=ImgDetMain" alt="Logo" />
        <h3 style={{textAlign:"center",marginTop:"10%"}}>LogIn</h3>
        <input className="m-2" style={{width:"55%",border:"1px solid"}} value={userId} name="userId" onChange={handle}  />
        <input className="m-2" style={{width:"55%",border:"1px solid"}} value={password} type="password" name="password" onChange={handle}  />
        <p style={{color:"lightgray"}}></p>
        <button className="btn btn-primary" style={{width:"20%"}} onClick={submit}>Submit</button>
      </div>           
    </div>
  );
}

export default LoginPage;
