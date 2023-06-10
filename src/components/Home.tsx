import styled from "styled-components";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react";
import CountDown from "../Time/countdown";
import Confetti from "react-confetti";

const CountDownContainer = styled(motion.div)`
  background: #313A3A;
  color: #e74d3d;
  font-size: 100px;
  width: 100%;
  height: 100%;
`


const CountDownDiv = styled.div`
  width: 60%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 20%;
  display: grid;

  grid-template-columns: 1fr 5px 1fr;
  justify-items: center;
  align-items: center;
  background-color: #e74d3d;
`

const RoundStatus = styled.div`
  font-size: 40px;
  color: white;
  position: fixed;
  bottom: 10%;
  left: 30%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
`

const GoalStatus = styled.div`
  font-size: 40px;
  color: white;
  position: fixed;
  bottom: 10%;
  right: 30%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
`

const CountDownH1 = styled(motion.div)`
  font-family: 'Gasoek One', sans-serif;
  width: 250px;
  height: 350px;
  background-color: #fefefe;
  text-align: center;
  line-height: 330px;
  border-radius: 10px;
`

const Btn = styled(motion.button)`
  width: 100px;
  height: 100px;
  position: fixed;
  left: 46%;
  bottom: 50px;
  border-radius: 100px;
  justify-items: center;
  align-items: center;
  border: 1px solid #e74d3d;
  color: white;
  background-color: rgba(0, 0, 0, 0.15);

  svg {
    width: 50%;
  }
`

function Home() {

  const [complete, setComplete] = useState(false)
  const [stop, setStop] = useState(true)
  const [round, setRound] = useState(1)
  const [goal, setGoal] = useState(0)
  const [isEnd, setIsEnd] = useState(false)
  const controls = useAnimationControls()

  const countdown = CountDown({
    // minutes: 25,
    seconds: 5,
    onCompleted: () => setComplete(true),
  })

  const countdownStatus = () => {
    if(stop === true){
      countdown.pause()
    }else {
      countdown.resume()
    }
  }

  const onClick = () => {
    setStop(prev => !prev)
    countdownStatus()
  }

  useEffect(() => {
    if(countdown.seconds === 0 && countdown.minutes === 0){
      setRound(prev => prev + 1)
      setStop(prev => !prev)
      countdown.reset()
      console.log("Ended")
    }
  }, [countdown.seconds])

  useEffect(() => {
    countdown.pause()
    if(round > 4){
      setGoal(prev => prev + 1)
      setRound(1)
    }
  },[round])

  const setTimerButton = () => {
    <button>setTimer</button>
  }

    return (
        <>
          <CountDownContainer>
            {goal > 20 && <Confetti />}
          <AnimatePresence>
          <CountDownDiv>
          <CountDownH1
              key={countdown.minutes + "m"}
              initial={{y: -150, opacity: 0}}
              animate={{y:0, opacity: 1}}
              transition={{
                ease: "easeOut",
                duration: 1
              }}>
              {countdown.minutes}
            </CountDownH1>
            <div style={{fontSize: "200px"}}>:</div>
            
            <CountDownH1
              key={countdown.seconds}
              initial={{y: -150, opacity: 0}}
              animate={{y:0, opacity: 1}}
              transition={{
                ease: "easeOut",
                duration: 1
              }}
              >
              {countdown.seconds}
            </CountDownH1>
          </CountDownDiv>
          </AnimatePresence>
        </CountDownContainer>
        <Btn onClick={onClick}
          whileHover={{
            scale: 1.2
          }}
          whileTap={{
            scale: .8,
          }}>
          {stop ? (
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
            </svg>      
          ) : (
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
            </svg>
          )}   
        </Btn>
        <RoundStatus>
          <div>{round}/4</div>
          <div>Round</div>
        </RoundStatus>
        <GoalStatus>
            <div>{goal}/20</div>
            <div>Goal</div>
        </GoalStatus>
        </>
    )
}

export default Home