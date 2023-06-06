import React from "react";
import { TravelListState, TravelProps } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const CountryLi = styled.li`
    width: 500px;
    background-color: ${props => props.theme.travelColor};
    text-align: center;
    font-size: 25px;
    margin-bottom: 15px;
    /* height: 50px; */
    align-self: center;
`

const Btn = styled.button`
    width: 40px;
    height: 40px;
    border: 1px solid ${props => props.theme.travelBorder};
`

function Country({country, category, id}: TravelProps){

    const setCountryList = useSetRecoilState(TravelListState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget:{name}} = event;

        setCountryList((oldCountries) => {
            const targetIdx = oldCountries.findIndex((country: TravelProps) => country.id === id);
            const newCountry = {country, id, category: name as any}; 
                   
            return name === "REMOVE" ? [...oldCountries.slice(0, targetIdx ), ...oldCountries.slice(targetIdx + 1)] : 
                [...oldCountries.slice(0, targetIdx), newCountry, ...oldCountries.slice(targetIdx + 1)]
        })
    }

    return (
        <>
        <CountryLi key={country}>
            <span>{country}  </span>
            {category === "WISH" && <><Btn name="TRAVELED" onClick={onClick}><span role="img" aria-label="check">✔️</span></Btn><Btn name="REMOVE" onClick={onClick}><span role="img">🗑️</span></Btn></>}
            {category === "TRAVELED" && <><Btn name="LIKED" onClick={onClick}><span role="img" aria-label="thumb_up">👍</span></Btn><Btn name="WISH" onClick={onClick}><span role="img" aria-label="thumb_up">✖️</span></Btn></>}
            {category === "LIKED" && <><Btn name="TRAVELED" onClick={onClick}><span role="img" aria-label="thumb_down">👎</span></Btn></>}
        </CountryLi>
        </>
    )
}

export default Country;