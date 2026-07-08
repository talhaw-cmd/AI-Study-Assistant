import React from 'react'
import { useState } from 'react'

const Register = () => {
    const [fullname, setfullname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("student")
    const [avatar, setavatar] = useState("")
    const [gender, setgender] = useState("Male")
    let register = async(e)=>{
        e.preventDefault()
        try {
            let res = fetch("http://localhost:5000/api/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname, email, password, role, avatar, gender
                })
            })

                .then(data=>{
                    alert(data.message)
                })

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <form onSubmit={register(e)}>
        <input value={fullname} onChange={(e)=>{setfullname(e.target.value)}}
        type="text" placeholder='fullname'/>
        <input value={email} onChange={(e)=>{setemail(e.target.value)}}
        type="email" placeholder='email'/>
        <input value={password} onChange={(e)=>{setpassword(e.target.value)}}
        type="text" placeholder='password'/>
        <select id="" value={role} onChange={(e)=>{setrole(e.target.value)}}>
            <option value="student">student</option>
            <option value="instructor">instructor</option>
            <option value="admin">admin</option>
        </select>
        <input value={avatar} onChange={(e)=>{setavatar(e.target.value)}} type="text" placeholder='avatar'/>
        <select id="" value={gender} onChange={(e)=>{setgender(e.target.value)}}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <input type="submit" value="Register"/>
      </form>
    </>
  )
}

export default Register
