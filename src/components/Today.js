import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import { useContext } from "react";
import  DayJS from 'react-dayjs';

export default function Today() {

    let date = Date();
    const { userInfo } = useContext(UserContext);
    const [habitList, setHabitList] = useState([]);

    useEffect(() => {
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
    } , []);

    return (
        <Thisday>
            <Header />
            <Introduction>
                <DayJS format="dddd, DD/MM" lelement="p">{date}</DayJS>
                <p>Nenhum hábito concluído ainda</p>
            </Introduction>
            <Message>
                <Habit>
                    <div>
                        <h1>Comer bem</h1>
                        <p>Sequencia atual: 3 dias</p>
                        <p>Seu record: 5 dias</p>
                    </div>
                    <div>
                        <BsCheckSquareFill size="70px" color="#EBEBEB"/>
                    </div>
                </Habit>
                <Habit>
                    <div>
                        <h1>Comer bem</h1>
                        <p>Sequencia atual: 3 dias</p>
                        <p>Seu record: 5 dias</p>
                    </div>
                    <div>
                        <BsCheckSquareFill size="70px" color="#EBEBEB"/>
                    </div>
                </Habit>
                <p>Você está sem tarefas registradas.</p>
            </Message>
            <Footer />
        </Thisday>
    );  
}

const Thisday = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    max-width: 375px;
    align-items: center;
    font-family: 'Lexend Deca';
    background: #E5E5E5;
`
const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 18px;
    font-size: 23px;
    color: #126BA5;

    p {
        margin-top: 4px;
    }

    p:nth-child(2) {
        font-size: 18px;
        color: #BABABA; 
    }
`
const Message = styled.div`
    font-size: 18px;
    color: #666666;
    padding: 17px;
    width: 100%;
`
const Habit = styled.div`
    display: flex;
    background-color: white;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 13px;
    margin-bottom: 10px;

    h1 {
        margin-bottom: 10px;
    }

    p {
        font-size: 13px;
    }
`
