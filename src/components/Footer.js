import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PercentageContext from "../contexts/PercentageContext";
import { useContext } from "react";


export default function Footer () {

    const navigate = useNavigate();
    const { percentage } = useContext(PercentageContext);

    return (
        <Foot>
            <p onClick={() => navigate('/habits')}>Hábitos</p>
            <Circular onClick={() => navigate('/today')}>
                <CircularProgressbar
                    value={percentage}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                    })}
                />
            </Circular>
            <p onClick={() => navigate('/history')}>Histórico</p>
        </Foot>
    );
}

const Foot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    max-width: 375px;
    padding: 0 36px;
    background-color: white;
    font-size: 18px;
    color: #52B6FF;

    > p {
        cursor: pointer;
    }
`
const Circular = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 91px;
    height: 91px;
    bottom: 0;
    margin-bottom: 45px;
`