import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import { useContext } from "react";
import  DayJS from 'react-dayjs';
import axios from "axios";


function TodayHabit ( {habit} ) {

    const { id, name, done, currentSequence, highestSequence } = habit;

    return (
        <Habit>
        <div>
            <h1>{name}</h1>
            <p>Sequencia atual: {currentSequence} dias</p>
            <p>Seu record: {highestSequence} dias</p>
        </div>
        <div>
            <BsCheckSquareFill size="70px" color={ done ? "#8FC549" : "#EBEBEB"}/>
        </div>
    </Habit>
    );
}

export default function Today() {

    let date = Date();
    const { userInfo } = useContext(UserContext);
    const [habitList, setHabitList] = useState([]);

    useEffect(() => {
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promisse.then((response) => {
            setHabitList(response.data);
        });
    } , []);

    return (
        <Thisday>
            <Header />
            <Introduction>
                <DayJS format="dddd, DD/MM" lelement="p">{date}</DayJS>
                <p>Nenhum hábito concluído ainda</p>
            </Introduction>
            <Message>
                { habitList === [] ?
                <p>Você está sem tarefas registradas.</p> :
                habitList.map( (habit) =>  <TodayHabit habit={habit}/> ) }
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
