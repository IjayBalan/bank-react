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
    <div style={{backgroundColor:"skyblue", width:"100vw", height:"100vh"}}>
    <div className=" d-flex justify-content-center align-items-center">
      <div className="container">
      <div className="row d-flex justify-content-center align-items-center"style={{marginTop:"10vh"}}>
      <div className="col-10 col-md-9 col-lg-8 col-xl-7" style={{border:"1px solid",backgroundColor:"white",borderColor:"skyblue",borderRadius:"10%",boxShadow:"0 4px 8px rgba(0,0,0,0.3)"}}>
        <div className="d-flex justify-content-center m-3">
          <img style={{width:"60%",height:"60%",display:"flex",justifyContent:"center",alignItems:"center"}} src="https://th.bing.com/th/id/OIP.lCll6raXJdLpNIhLaqpVBQHaEo?rs=1&pid=ImgDetMain" alt="Logo" />
        </div>
        <h5 style={{textAlign:"center"}}>LogIn</h5>
        <div className="d-flex justify-content-center">
          <input className="m-3" style={{width:"60%",border:"1px solid"}} value={userId} name="userId" onChange={handle}  />
        </div>
        <div className="d-flex justify-content-center"> 
          <input className="m-2" style={{width:"60%",border:"1px solid"}} value={password} type="password" name="password" onChange={handle}  />
        </div>
        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" style={{width:"35%"}} onClick={submit}>Submit</button>
        </div>                    
      </div>
      </div>
      </div>
    </div>            
  </div>
  );
}

export default LoginPage;
