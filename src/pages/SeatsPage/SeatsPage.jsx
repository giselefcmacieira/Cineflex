import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import SeatItem from "./Seat";

export default function SeatsPage(props) {
    const navigate = useNavigate();

    const {seatsSelected, setSeatsSelected} = props;

    const {sessaoid} = useParams();

    const [nome, setNome] = useState('');

    const [cpf, setCPF] = useState('');

    const [seats, setSeats] = useState(null);

    const [posterURL, setPosterURL] = useState('');
    
    const[title, setTitle] = useState('');

    const[weekday, setWeekday] = useState('');

    const[time, setTime] = useState('');

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessaoid}/seats`;
        const requisicao = axios.get(url);
        requisicao.then(resposta => {
            console.log(resposta.data.name);
            setSeats(resposta.data.seats);
            setPosterURL(resposta.data.movie.posterURL);
            setTitle(resposta.data.movie.title);
            setWeekday(resposta.data.day.weekday);
            setTime(resposta.data.name);
        })
        requisicao.catch(erro => {
            console.log(erro);
        })
    }, [])

    function bookSeats(event){
        event.preventDefault();
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const seatsBooking = {
            ids: seatsSelected,
            name: nome,
            cpf: cpf,
        } 
        const requisicao = axios.post(url, seatsBooking);
        requisicao.then(resposta => {
            navigate('/sucesso');
        })
    }

    if(seats === null){
        return(
            <PageContainer>
                Carregando ...
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(seat =>(
                <SeatItem key = {seat.id} seat = {seat} seatsSelected={seatsSelected} setSeatsSelected={setSeatsSelected}/>)
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle type={'selecionado'}>
                    </CaptionCircle>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle type={'disponível'}>
                    </CaptionCircle>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle type={'indisponível'}>
                    </CaptionCircle>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={bookSeats}>
                <label htmlFor='campoNome'>Nome do Comprador:</label>
                <input required 
                type='text' 
                id= 'campoNome'
                value = {nome}
                onChange = {e => setNome(e.target.value)}
                placeholder="Digite seu nome..." 
                />
                <label htmlFor='campoCPF'>CPF do Comprador:</label>
                <input required 
                type='number' 
                id='campoCPF'
                value = {cpf}
                onChange = {e => setCPF(e.target.value)}
                placeholder="Digite seu CPF..." />
                <button type='submit'>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{`${title}`}</p>
                    <p>{`${weekday}`} - {`${time}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    // border: 1px solid #0E7D71;
    border: ${props => {
        switch (props.type){
            case 'selecionado':
                return '1px solid #0E7D71';
            case 'disponível':
                return '1px solid #7B8B99';
            case 'indisponível':
                return '1px solid #F7C52B';
        }
    }};         // Essa cor deve mudar
    background-color: ${props => {
        switch (props.type){
            case 'selecionado':
                return '#1AAE9E';
            case 'disponível':
                return '#C3CFD9';
            case 'indisponível':
                return '#FBE192';
        }
    }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`