import styled from "styled-components";
import logo from './images/logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';


export default function SignIn () {

    let objToSend = {email:"", name:"", image:"", password:""};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(false);

    let navigate = useNavigate();

    function moveToSignIn () {
        navigate('/');
    }

    function sendObject () {
        objToSend = {email:email, name:name, image:image, password:password}
        setDisable(true);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", objToSend);
        promisse.then((response) => {
            alert( "Usuário criado com sucesso. Faça o login para prosseguir" );
            navigate('/');
        });
        promisse.catch(() => {
            alert("Dados invalidos. Verifique as informações inseridas");
            setDisable(false);
        });
    }

    return (
        <Logon>
            <img src={logo} alt="TrackIt" />
            <input placeholder='email' disabled={disable} onChange={entry => setEmail(entry.target.value)} value={email} ></input>
            <input placeholder='senha' disabled={disable} onChange={entry => setPassword(entry.target.value)} value={password} ></input>
            <input placeholder='nome' disabled={disable} onChange={entry => setName(entry.target.value)} value={name} ></input>
            <input placeholder='foto' disabled={disable} onChange={entry => setImage(entry.target.value)} value={image} ></input>
            <button onClick={sendObject}>{ disable === false ? "Cadastrar" : <ThreeDots color="white" height={80} width={80} />}</button>
            <a onClick={moveToSignIn}> Já tem uma conta? Faça login!</a>
        </Logon>
    )
}

const Logon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 375px;
    align-items: center;
    
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