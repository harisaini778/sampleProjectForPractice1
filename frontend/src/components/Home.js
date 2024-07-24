import React from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';



const Home = () => {


    const [resData,setResData] = useState(null);

    const token = localStorage.getItem("token");



    const fetchUsersInfo = async () => {
          try {
            const res =  await axios.get("http://localhost:5000/users/fetchUsersInfo",{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });

            if(res) {

                setResData(res.data);
                console.log("res from fetchUserInfo is : ", res.data);
            }

            //console.log("res from fetchUserInfo is : ", resData);
          } catch(err) {
            console.log(err);
          }
    }


    useEffect(()=>{
       fetchUsersInfo();
    },[])


  return (
    <Container>

        <h1 className='mt-2'>Home Page</h1>

        {resData ? (<>
        <Container className='text-center'>
            <Row>Hi welcome to the home page your details are : </Row>
            <Row>{resData.user.name}</Row>
            <Row>{resData.user.email}</Row>
            <Row>{resData.user.createdAt}</Row>
            <Row>{resData.user.updatedAt}</Row>

        </Container>
        </>) : (<>Loading...</>)}

    </Container>
  )
}

export default Home