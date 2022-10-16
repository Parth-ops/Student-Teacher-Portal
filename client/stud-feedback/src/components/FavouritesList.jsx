import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function FavouritesList(){

    let favArr = useRef([]);

    const [all,setAll]=useState([]);
    const [favs, setFavs]=useState([]);
    const [mostFav, setMostFav] = useState("");
    const [loading1,setloading1 ]=useState(true);
    const [loading2,setloading2 ]=useState(true);

    useEffect(()=>{
        getAllTeachers();
        getFavTeachers();
   
    }, [])
    


    // const myuser = JSON.parse(localStorage.getItem("User"));
    // const accessToken = myuser.accessToken;
    // const roll_no = myuser.data.roll;
    // console.log(accessToken);
const addFav = (e) => {
    var name = e.target.innerText;
    // console.log(e);
    
    if(all && favs)
    {  

            for(var fav of favs)
            {
                if(name === fav)
                {
                    alert("Already in fav list");
                    return;
                }
            }    
        
    }
    
    setFavs([...favs, name]
        // return existingItems.concat([getRandomNumber()]);
      );
    
}
const remFav = (idx) =>{
    // var name = e.target.name;
    // const index = favs.indexOf(name);
    // console.log(favs);
    // favs.splice(index, 1);
    // console.log(favs);
    // setloading1(true);
    // setFavs([...favs, favs.splice(index, 1)]);
    // setTimeout(() => {setloading1(false)}, 1000);
    const newFavs = favs.filter((_, i) => i !== idx);
    setFavs(newFavs);
}

 
function getAllTeachers() { 
    const myuser = JSON.parse(localStorage.getItem("User"));
    const accessToken = myuser.accessToken;

    console.log(accessToken);

    axios.post('http://localhost:9002/get-all',  
       ).then(res=>{
        setAll(res.data.allTeachers);
        setloading1(false);
        // console.log(res.data.allTeachers);


         
        
         
    })
}


function getFavTeachers() { 
    const myuser = JSON.parse(localStorage.getItem("User"));
    const accessToken = myuser.accessToken;
    const roll_no = myuser.data.roll;
    console.log(accessToken);
    axios.post('http://localhost:9002/get-favs', {roll_no: roll_no}
    ).then(res=>{
        // console.log(res.data.favTeachers);
        setFavs(res.data.favTeachers);
        setloading2(false);
         
        
         
    })
}


    function updateFavs(){
        const myuser = JSON.parse(localStorage.getItem("User"));
        // const accessToken = myuser.accessToken;
        const roll_no = myuser.data.roll;
        console.log("hello")
        axios.post('http://localhost:9002/add-favs', {roll: roll_no, teachers: favs}
        ).then(res=>{
                alert(res.data.message);
             
            
             
        })

    }

    function getMostFav(){

        axios.post('http://localhost:9002/get-score', 
        ).then(res=>{
                alert(res.data.message);
                setMostFav(res.data.mostfav);
            
             
        })

    }


   if(loading1 || loading2){
    if(all === [])
    {
        return(
        <h1> No teachers registered! Wait for teachers to register.</h1>
    )
        
    }
   else if(favs === [])
    {
        return(
            <h1> No favorite teachers added .</h1>
        )
    }
    
       return(
           <h1> loading....</h1>
       )
   }


    return (
    <div>
        <div>
                <DropdownButton id="dropdown-basic-button" title="ADD Favourite Teacher to list">
                    {all.map(
                        function(t, index)
                            {
                                return( <Dropdown.Item href="#/action-1"  onClick={addFav}>{t}</Dropdown.Item>)
                            }
                        )
                    }
                </DropdownButton>
                </div>
                 
                <div>
                <ListGroup as="ol" numbered>
                    {favs.map(
                            function(t, idx)
                                {
                                    return( <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                        key={idx}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{t}</div>
                                        </div>
                                        <Button variant="danger" name={t} onClick={() => remFav(idx)}>Remove</Button>{' '}
                                    </ListGroup.Item>)
                                }
                            )
                        }
                    
                </ListGroup>
            </div>
            <div>
                <Button variant="success" onClick={updateFavs}>Update List</Button>{' '}
                <Button variant="success" onClick={getMostFav}>Most Favourite Teacher</Button>{' '}
                <div><h2 style={{padding:"50px"}}>Most favourite teacher is : {mostFav}</h2></div>
            </div>
            <div>
                <h3 style={{padding: "100px"}}>Changes made to the list will be lost if the list is not updated. Please click Update List button to update.</h3>
            </div>

    </div>
    );
}
export default FavouritesList;