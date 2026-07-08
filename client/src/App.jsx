import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const App = () => {
  const [player, setplayer] = useState([])
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [image, setimage] = useState("")
  const [editId, seteditId] = useState("")


  
  let fetchdata = async()=>{
    try{
      let res = await fetch("http://localhost:5000/")
        let data = await res.json()
        setplayer(data)
    }
    catch(err){
      console.log(err)
    }
  }

let add = async(e)=>{
e.preventDefault()
  try {
    if(editId){
          let res = await fetch(`http://localhost:5000/update/${editId}`,{
      method: "PUT",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({name, email, image})})
      let data = await res.json()
      setplayer(player.map(e=>e._id===editId?data:e))
    }
    else{

      let res = await fetch("http://localhost:5000/add",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: name, 
          email: email,
          image: image})
      })
  let data = await res.json()

  setplayer([...player, data])

    }
  } catch (error) {
    console.log(error)
  }

  
}

let del = async(id)=>{
  try {
    let res = await fetch(`http://localhost:5000/delete/${id}`,{
      method: "DELETE"
    })
    let data = await res.json()
    setplayer(player.filter(p=> p._id!==id))
  } catch (error) {
    console.log(error)
  }
}

// let update = async(id) {
//   try {


//     })

//     let data = await res.json()
//     setplayer()
//   } catch (error) {
//     console.log(error)
//   }
// }

let edit = (p)=>{
  seteditId(p._id)
  setname(p.name)
  setemail(p.email)
  setimage(p.image)
}
  useEffect(() => {
    fetchdata()
  }, [player])

  return (
    <div>

      <form onSubmit={add}>
        <input type="text" name="" id="" 
        value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type="text" name="" id="" 
        value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <input type="text" name="" id="" 
        value={image} onChange={(e)=>{setimage(e.target.value)}}/>
        <input type="submit" value={editId?"Update Player":"Add Player"}/>
      </form>
      {
        player.map((e, index)=>{
          return(
            <li key={index}>
          <h1>{e.name}</h1>
          <h1>{e.email}</h1>
          <img src={e.image} />
          <button onClick={()=>{del(e._id)}}>Delete</button>
          <button onClick={()=>{edit(e)}}>Edit</button>
          </li>
          )
        })

      }
    </div>
  )
}

export default App
