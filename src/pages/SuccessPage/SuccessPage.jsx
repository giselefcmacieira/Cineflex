import styled from "styled-components"
import { useNavigate } from "react-router-dom";

export default function SuccessPage(props) {

    const {nome, setNome, cpf, setCPF, seatsSelected, setSeatsSelected, date, setDate, time, setTime, title, setTitle} = props

    const navigate = useNavigate();

    function voltarParaHome(){
        setSeatsSelected([]);
        setNome('');
        setCPF('');
        setDate('');
        setTime('');
        setTitle('');
        navigate('/');
    }
    
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{`${title}`}</p>
                <p>{`${date}`} - {`${time}`}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {seatsSelected.map(seat => (
                <p>Assento {`${seat.name}`}</p>)
                )}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {`${nome}`}</p>
                <p>CPF: {`${cpf}`}</p>
            </TextContainer>

            <button data-test="go-home-btn" onClick={voltarParaHome}>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`