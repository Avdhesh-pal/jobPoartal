import React from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';
import { Input } from '../ui/input';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';
import { Label } from '../ui/label';


const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div>
     <Navbar/>
     <div className='max-w-4xl mx-auto' >
        <div className='my-10'>
            <h1>Your Company Name</h1>
            <p>What would you like to give your company name? you can change this later </p>
        </div>
        <Label>Company Name</Label>
        <Input
            type="text"
            className="my-2"
            placeholder="JobHunt , Google etc."
            onClick = {()=>navigate('')}
            onChange ={(e)=>setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany} >Continue</Button>
        </div>
     </div>
    </div>
  )
}

export default CompanyCreate;
