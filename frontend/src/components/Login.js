import React  from "react";

import {Container,Row,Col,Form,Button} from "react-bootstrap";

import { useState } from "react";

import axios from "axios";

const Login  = () => {

    const [name,setName] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [isLoginClicked,setIsLoginClicked] = useState(false);

    const switchFormHandler = () => {
        setIsLoginClicked((prevState)=>!prevState);
    };

    const loginFormSubmitHandler = async (e) => {
     
        try {
          
            e.preventDefault();
            const userData = {
              email,
              password
            };

         const res =  await axios.post("http://localhost:5000/users/login",userData,{
           headers : {
            "Content-Type" : "application/json"
           }
         });

        if(res) {
            console.log("form data submitted succesfully : ", res.data);
        }

        } catch (err) {
           console.log("err occured while login : ",err);
        }

    };



        const signupFormSubmitHandler = async (e) => {
     
            try {
              
                e.preventDefault();

                const userData = {
                  name,
                  email,
                  password,
                };

                console.log("userData while signup is : ",userData);
    
             const res =  await axios.post("http://localhost:5000/users/signup",userData,{
               headers : {
                "Content-Type" : "application/json"
               }
             });
    
            if(res) {
                console.log("form data submitted succesfully : ", res.data);
            }
    
            } catch (err) {
               console.log("err occured while signup : ",err);
            }
    

    }

    return (
        <Container className="mt-5">
           {isLoginClicked && <Row>
            <h2 style={{textAlign : "center"}}>Login</h2>
            <Form onSubmit={loginFormSubmitHandler}>
                <Form.Label className="m-1">Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} className="m-1"></Form.Control>
                <Form.Label className="m-1">Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} className="m-1"></Form.Control>
                <Button type="submit" className="m-1">Login</Button>
                <p className="m-1">New User ? <span onClick={switchFormHandler}>Signup</span></p>
            </Form>
            </Row>}
            <Row>
           { !isLoginClicked && <Form onSubmit={signupFormSubmitHandler}>
           <h2 style={{textAlign : "center"}}>Signup</h2>
            <Form.Label className="m-1">Name</Form.Label>
                <Form.Control type="text" onChange={(e)=>setName(e.target.value)} className="m-1"></Form.Control>
                <Form.Label className="m-1">Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} className="m-1"></Form.Control>
                <Form.Label className="m-1">Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} className="m-1"></Form.Control>
                <Button type="submit" className="m-1">Signup</Button>
                <p className="m-1">Existing User ? <span onClick={switchFormHandler}>Login here</span></p>
            </Form>}
            </Row>
        </Container>
    );
};

export default Login;