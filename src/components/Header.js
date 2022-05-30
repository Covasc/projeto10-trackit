import styled from "styled-components";
import UserContext from '../contexts/UserContext';
import { useContext } from "react";


export default function Header () {

    const { userInfo } = useContext(UserContext);
    const image = userInfo.image;

    return (
        <>
            <Head>
                <h1>TrackIt</h1>
                {/* recebe como props a imagem que vem no retorno do login */}
                <img src={image} alt="Avatar" />
            </Head>
        </>
    );
}

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 9px 16px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1 {
        font-family: "Playball";
        font-size: 39px;
        color: white;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 25px;
    }
`
