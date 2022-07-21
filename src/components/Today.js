import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import PercentageContext from "../contexts/PercentageContext";
import { useContext } from "react";
import  DayJS from 'react-dayjs';
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';


function TodayHabit ( {habit, reload, setReload} ) {

    const { userInfo } = useContext(UserContext);
    const { id, name, done, currentSequence, highestSequence } = habit;

    function check () {

        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };

        if (done) {
            const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{}, config)
            promisse.then((response) => {
                setReload(!reload);
            });
        } else {
            const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{}, config)
            promisse.then((response) => {
                setReload(!reload);
            });
        };
    }

    return (
        <Habit>
        <div>
            <h1>{name}</h1>
            <p>Sequencia atual:<span className={done === true ? "green" : "gray"}> {currentSequence} dias</span></p>
            <p>Seu record:<span className={currentSequence === highestSequence && done === true ? "green" : "gray"}> {highestSequence} dias</span></p>
        </div>
        <div>
            <BsCheckSquareFill onClick={check} size="70px" color={ done ? "#8FC549" : "#EBEBEB"}/>
        </div>
    </Habit>
    );
}

export default function Today() {

    let date = (dayjs().locale("pt-br").format("dddd, DD/MM"));
    let firstL = date[0].toUpperCase();
    let restL = date.substring(1);
    let newDate = firstL + restL;

    const { userInfo } = useContext(UserContext);
    const {percentage, setPercentage} = useContext(PercentageContext);
    console.log(percentage);
    const [habitList, setHabitList] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promisse.then((response) => {
            setHabitList(response.data);
            let cont = 0;
            response.data.map((obj) => {
                obj.done ? cont = cont + 1 : cont = cont + 0;
            })
            if (response.data.length !== 0) {
            let displayPercentage = Number(((cont / response.data.length)*100).toFixed(0));
            setPercentage(displayPercentage);
            }
        });
    } , [reload]);

    return (
        <Thisday>
            <Header />
            <Introduction>
                <h1>{newDate}</h1>
                {percentage === 0 ? <p>Nenhum hábito concluído ainda</p> : <p className="green">{`${percentage}% dos hábitos concluídos`}</p>}
            </Introduction>
            <Message>
                { habitList.length === 0 ?
                <p>Você está sem tarefas registradas.</p> :
                habitList.map( (habit) =>  <TodayHabit reload={reload} setReload={setReload} habit={habit}/> ) }
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

    .green {
        color: #8FC549;
    }

    p {
        margin-top: 4px;
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

    > div:nth-child(2){
        cursor: pointer;
    }

    h1 {
        margin-bottom: 10px;
    }

    p {
        font-size: 13px;
    }

    .green {
        color: #8FC549;
    }

    .gray {
        color: #EBEBEB;
    }
`
