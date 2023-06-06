import { useRecoilState } from "recoil";
import { TravelListState } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";


const Country = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

const Title = styled.div`
    font-size: 26px;
`

const Btn = styled.button`
    height: 30px;
`

const Input = styled.input`
   width: 200px;
   height: 30px;
   margin-top: 1.5%;
    padding: 0 0 5px 0;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid ${props => props.theme.textColor};
    font-size: 1.1em;
    font-weight: 300;
    color: #f8d055;
`

const Form = styled.form`
    height: 200px;
`

interface FormData {
    country:string;
}

function CreateTravelList() {

    const { register, handleSubmit, formState:{errors}, reset } = useForm<FormData>();
    const [travelList, setTravelList] = useRecoilState(TravelListState);

    const onValid = ({country}: FormData) => {
        setTravelList((prev: any) => [{country:country, category: "WISH", id:country}, ...prev])
        console.log(reset())

    }

    useEffect(() => {
        if (localStorage.getItem("travelList") !== null || localStorage.getItem("travelList") !== "[]") {
            setTravelList(JSON.parse(localStorage.getItem("travelList") || "[]"))
        }
    }, [])

    useEffect(() => {
        travelList.length !== 0 ? localStorage.setItem("travelList", JSON.stringify(travelList)) : null
    }, [travelList])

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Title>내가 가고싶은 나라들</Title>
            <Input {...register("country", {required: "이름이 필요합니다!", minLength: {value: 1, message: "1글자 이상이어야 합니다."}}, )} type="text" placeholder="이름" />
            <span>{errors?.country?.message}</span>
            <Btn>가자!</Btn>
        </Form>
    )
}

export default CreateTravelList;