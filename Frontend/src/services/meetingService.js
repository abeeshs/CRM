import axios from "axios";

//----------------------- Get the details of the user who has meeting---------

export const getMemberToInvite=async()=>{
    try{
        const {token} = JSON.parse(localStorage.getItem('admin-auth')); 
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/meetings/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    }catch(err){
        console.log(err)
    }
}