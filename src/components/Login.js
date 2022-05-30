import styled from "styled-components";
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import UserContext from '../contexts/UserContext';
import { useContext } from "react";
import { ThreeDots } from 'react-loader-spinner';


export default function Login () {

    let objToSend = {email:"" , password:""};
    const { setUserInfo } = useContext(UserContext);
    const [disable, setDisable] = useState(false);

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function sendObject () {
        objToSend = { email: email, password: password };
        setDisable(true);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", objToSend);
        promisse.then((response) =>{   
            setUserInfo(response.data);
            navigate('/habits')
        });
        promisse.catch(() => {
            alert("Usuário ou senha incorretos");
            setDisable(false);
        });
    }

    function moveToLogin () {
        navigate('/signin');
    }

    return (
        <Logon>
            <img src={logo} alt="TrackIt" />
            <input type='email' disabled={disable} placeholder='email' onChange={entry => {setEmail(entry.target.value)}} value={email}></input>
            <input type='text' disabled={disable} placeholder='senha' onChange={entry => setPassword(entry.target.value)} value={password}></input>
            <button onClick={sendObject}>{ disable === false ? "Entrar" : <ThreeDots color="white" height={80} width={80} />}</button>
            <a onClick={moveToLogin}>Não tem uma conta? Cadastre-se!</a>
        </Logon>
    )
}

const Logon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 375px;
    align-items: center;
    margin-top: 60px;
    
    img {
        width: 180px;
        height: 180px;
        margin: 25px 0;
    }

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 9px;
        font-size: 20px;
        margin: 3px 0;

        ::placeholder {
            color: #D5D5D5;
        }
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        font-size: 20px;
        color: white;
        margin: 3px 0 25px 0;
        border: 0px none;
    }

    a {
        font-size: 17px;
        color: #52B6FF;
        font-family: 'Lexend Deca';
        text-decoration: underline;
    }
`