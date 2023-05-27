import { useState } from "react";
import styled from "styled-components";


export default function SeatItem(props){

    const {seat, seatsSelected, setSeatsSelected, seatsSelectedNames, setSeatsSelectedNames,} = props;

    const [selected, setSeleted] = useState('não');

    function selectSeat(availability){
        if(!availability){
            alert("Esse assento não está disponível");
        }
        if(availability && selected === 'não'){
            setSeleted('sim');
            const novaArrayid = [...seatsSelected];
            novaArrayid.push(seat.id);
            setSeatsSelected(novaArrayid);
            const novaArrayName = [...seatsSelectedNames];
            novaArrayName.push(seat.name);
            setSeatsSelectedNames(novaArrayName);
        }
        if(availability && selected === 'sim'){
            setSeleted('não');
            const newArrayid = [];
            for(let i = 0; i < seatsSelected.length; i++){
                if(seatsSelected[i] !== seat.id){
                    newArrayid.push(seatsSelected[i]);
                }
            }
            setSeatsSelected(newArrayid);

            const newArrayName = [];
            for(let i = 0; i<seatsSelectedNames.length; i++){
                if(seatsSelectedNames[i] !== seat.name){
                    newArrayName.push(seatsSelectedNames[i]);
                }
            }
            setSeatsSelectedNames(newArrayName);
        }
    }
    

    return(
        <SeatItemm data-test="seat" available = {seat.isAvailable} selected = {selected} onClick = {() => selectSeat(seat.isAvailable)}>
            {`${seat.name}`}
        </SeatItemm>
    );   
}




const SeatItemm = styled.div`
    border: ${ props => {            
            if (props.available){
                if(props.selected === 'não'){
                    return '1px solid #7B8B99';
                }else{
                    return '1px solid #0E7D71';
                }       
            }else{
                return '1px solid #F7C52B';
            }
        }};
    background-color: ${ props => {            
            if (props.available){
                if(props.selected === 'não'){
                    return '#C3CFD9';
                }else{
                    return '#1AAE9E';
                }  
            }else{
                return '#FBE192';
            }
        }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`