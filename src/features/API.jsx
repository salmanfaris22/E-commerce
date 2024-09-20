import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const AllPruduct = createAsyncThunk("product",async()=>{
    try{
            const res = await axios.get("https://shoezee.onrender.com/item")
            return res.data
    }catch(err){
        err
    }
})

export const AllUSers = createAsyncThunk("user",async(id)=>{
    try{
        console.log("athi");
            const res = await axios.get("https://shoezee.onrender.com/user")
            const mails =res.data
           const get= mails.find((e)=>e.email==id.email)
           if(get){
           
                toast.error("This Email Alredy Used")
                return false
            
           }else{
        
            console.log("id",id);
      
             await axios.post("https://shoezee.onrender.com/user/",{...id,cart:{}}).then(()=>{
                toast.success("succefully regisrtered")
             }).then(()=>{
                window.location.href = 'http://localhost:5173/login';
               return true
             })
           }
           return false
    }catch(err){
        err
    }
})
export const LogineUser = createAsyncThunk("user",async(id)=>{
    try{
        
            const res = await axios.get("https://shoezee.onrender.com/user/")
            const mails =res.data
           const get= mails.find((e)=>e.email==id.email)
           if(get){
               
                toast.error("This Email Alredy Used")
                return false
            
           }else{
        
           
      
             await axios.post("https://shoezee.onrender.com/user/",{...id}).then(()=>{
                history.push('/login');
             })
           }
           return false
    }catch(err){
        err
    }
})

