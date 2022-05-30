import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import {BsPlusSquareFill} from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import { useContext } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';


function DayButton ({day, number, days, setDays}) {

    const [color, setColor] = useState("")

    function selected () {
        if (color === "") {
            setColor("Selected");
            setDays([...days, number]);
        } else {
            setColor("");
            setDays(days.filter(num => num !== number));
        }
    }

    return (
        <button className={color} onClick={selected}>{day}</button>
    )
}

function CreationMenu ({setCreation, reload, setReload}) {

    const [days, setDays] = useState([]);
    const [entry, setEntry] = useState("");
    const [disable, setDisable] = useState(false);
    const { userInfo } = useContext(UserContext);

    function sendObject () {
        setDisable(true);
        const objToSend = {name:entry, days:days};
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", objToSend, config);
        promisse.then(() =>{
            setDisable(false);
            setCreation(undefined);
            setReload(!reload);
        });
        promisse.catch(() => {
            setDisable(false);
        })
    }

    return (
        <Creation>
            <div>
                <input 
                placeholder="nome do hábito" 
                disabled={disable}
                onChange={entry => setEntry(entry.target.value)}
                value={entry}>
                </input>
                <WeekDay>
                    <DayButton day="D" number="0" days={days} setDays={setDays} />
                    <DayButton day="S" number="1" days={days} setDays={setDays} />
                    <DayButton day="T" number="2" days={days} setDays={setDays} />
                    <DayButton day="Q" number="3" days={days} setDays={setDays} />
                    <DayButton day="Q" number="4" days={days} setDays={setDays} />
                    <DayButton day="S" number="5" days={days} setDays={setDays} />
                    <DayButton day="S" number="6" days={days} setDays={setDays} />
                </WeekDay>
                <Confirm>
                    <button disabled={disable}>Cancel</button>
                    <button disabled={disable} onClick={sendObject} >{ disable === false ? "Salvar" : <ThreeDots color="white" height={40} width={40} />}</button>
                </Confirm>
            </div>
        </Creation>
    );
}

function HabitList ( {list, reload, setReload} ) {

    const { userInfo } = useContext(UserContext);

    function deleteHabit () {
        const deleteURL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${list.id}`;
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
        const promisse = axios.delete(deleteURL, config);
        promisse.then(() =>{
            alert("Hábito excluído.");
            setReload(!reload);
        });
    }

    return (
        <HabitSaved>
            <div>
                <p>{list.name}</p>
                <WeekDay>
                    <button className={list.days.includes(0) ? "Selected" : ""}>D</button>
                    <button className={list.days.includes(1) ? "Selected" : ""}>S</button>
                    <button className={list.days.includes(2) ? "Selected" : ""}>T</button>
                    <button className={list.days.includes(3) ? "Selected" : ""}>Q</button>
                    <button className={list.days.includes(4) ? "Selected" : ""}>Q</button>
                    <button className={list.days.includes(5) ? "Selected" : ""}>S</button>
                    <button className={list.days.includes(6) ? "Selected" : ""}>S</button>
                </WeekDay>
                <Trash>
                    <BsTrash onClick={deleteHabit} size="15px" color="black"/>
                </Trash>
            </div>
        </HabitSaved>
    );
}

export default function Habits () {

    const [creation, setCreation] = useState(undefined);
    const [renderList, setRenderList] = useState([]);
    const [reload, setReload] = useState(true);
    const { userInfo } = useContext(UserContext);


    useEffect(() => {
        const config = { headers: {Authorization:`Bearer ${userInfo.token}`} };
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promisse.then((response) => {
            setRenderList(response.data);
        });
        promisse.catch(() => console.log("DEU RUIM"));
    }, [reload]);

    function openCreation() {
        creation === undefined ? setCreation("create") : setCreation(undefined);
    }

    return (
        <Habit>
            <Header />
            <Introduction>
                <p>Meus hábitos</p>
                <BsPlusSquareFill onClick={openCreation} size="35px" color="#52B6FF"/>
            </Introduction>
            {creation !== undefined && <CreationMenu setCreation={setCreation} setReload={setReload} reload={reload}/>}
            <HabitPlace>
                {renderList === [] ? 
                <p>Você ainda não tem nenhum hábito cadastrado. Adicione um hábito para começar a trackear!</p> : 
                renderList.map( (list) => <HabitList list={list} setReload={setReload} reload={reload}/>)}    
            </HabitPlace>
            <Footer />
        </Habit>
    )
}

const Habit = styled.div`
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
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 18px;
    font-size: 23px;
    color: #126BA5;
`
const HabitPlace = styled.div`
    font-size: 18px;
    color: #666666;
    width: 100%;

    > p {
        padding: 17px;
    }
`
const Creation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 17px;

    > div {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 180px;
        padding: 19px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 10px;

        > p {
            font-size: 20px;
            margin-bottom: 8px;
        }
    }

    input {
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 20px;
        padding: 11px;

        ::placeholder {
            color: #DBDBDB; 
        }
    }

`
const HabitSaved = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 17px;

    > div {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 91px;
        padding: 19px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 10px;

        > p {
            font-size: 20px;
            margin-bottom: 8px;
        }
    }
    input {
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 20px;
        padding: 11px;

        ::placeholder {
            color: #DBDBDB; 
        }
    }
`
const Trash = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`
const WeekDay = styled.div`
    button {
        width: 30px;
        height: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-right: 4px;
        background-color: white;
        color: #DBDBDB;
        font-size: 20px;
    }

    .Selected {
        background-color: #CFCFCF;
        border: 1px solid #CFCFCF;
        color: white;
    }
`
const Confirm = styled.div`
    display: flex;
    position: absolute;
    bottom: 18px;
    right: 18px;

    button:nth-child(1) {
        font-size: 16px;
        background-color: white;
        color: #52B6FF;
        border: 0px none;
        margin: 0 23px;
    }

    button:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 84px;
        height: 35px;
        background: #52B6FF;
        color: white;
        border: 0px none;
        border-radius: 4.63636px;
    }
`