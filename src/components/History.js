import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

export default function History() {
    return (
        <Historic>
            <Header />
            <Introduction>
                <p>Histórico</p>
            </Introduction>
            <Message>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Message>
            <Footer />
        </Historic>
    )
}

const Historic = styled.div`
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
    height: 71px;
    padding: 18px;
    font-size: 23px;
    color: #126BA5;
`

const Message = styled.div`
    font-size: 18px;
    color: #666666;
    padding: 17px;
`
