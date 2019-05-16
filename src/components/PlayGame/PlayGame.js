import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./PlayGame.scss";
import Timer from "./Timer/Timer";
import Question from "./Question/Question";
import SelectAnswerButton from "./SelectAnswerButton/SelectAnswerButton";
import Scoreboard from "../Scoreboard/Scoreboard";
import { gamesRef } from "../../config/firebase";
import CorrectAnswer from './CorrectAnswer/CorrectAnswer'
import WrongAnswer from './WrongAnswer/WrongAnswer'
import _ from 'underscore'

const PlayGame = props => {
  const [count, setCount] = useState(20); //timer count
  const [questionCount, setQuestionCount] = useState(1); // question count
  const [gameEnded, setGameEnded] = useState(false); // to get to scores
  const [isLastCorrect, setIsLastCorrect] = useState(0); // 
  const [answered, setAnswered ] = useState(false) // sees if player has answered
  const [currentQ, setcurrentQ] = useState(0) // sees current Q
  const [ scoreTrack, setScore ] = useState(0) // keeps track of last score 

  const games_pin = props.location.state.gamePin;
  const gameRef = gamesRef.child(games_pin);

  let questionList = [];

  gameRef.once("value", snapshot => {
    questionList = snapshot.val().questions;
  });

  gameRef.on("value", snapshot => { /// heaps of checks to move players on

    if (snapshot.val().go_to_scoreboard === true ){ // if it is 0 then the scoreboard is loaded
      setCount(0)
      gameRef.child('go_to_scoreboard').set(false) // just sets it not to 0
    }

    if (snapshot.val().nextQuestion === true ){
      initialize()
      setAnswered(false)
      setCount(20);

      gameRef.child('nextQuestion').set(false)
    }

    if ( snapshot.val().gameEnd === true ){
      setGameEnded( true )
      gameRef.child('gameEnd').set(false)
    }
  })

    const updateState = () => {
      setQuestionCount( questionCount + 1) // needed to do this, wouldn't work otherwise
    }

    let initialize = _.once(updateState)

    const pointCalc = (timeRemaining) => {
      let max = 1200
      let min = 800

      let pointSpread = max - min
      let speed = ( timeRemaining / 20 )

      return min + (pointSpread * speed)
    }
  




  const _submitAnswer = (answer, correct) => {
    if (props.location.state.isAdmin || count === 0){
      return  // this means that admin cant try and answer any questions and you cant in the scoreboard either
    } else {
    gameRef
      .child(`players/${props.location.state.nickname.nickname}`)
      .once("value", snapshot => {
        const playerObj = snapshot.val();
        let correct_answers = snapshot.val().correct_answers;
        let last_correct = snapshot.val().last_correct;
        let points = snapshot.val().points;
        let score = snapshot.val().score;
        let streak = snapshot.val().streak;
        if (correct) {
          setIsLastCorrect(true);
          correct_answers = Number(correct_answers) + 1;
          last_correct = true;
          points = pointCalc(count);
          score = Number(score) + points;
          setScore( score )
          streak = Number(streak) + 1;
        } else {
          streak = 0;
          last_correct = false;
          setIsLastCorrect( false )
        }
        gameRef
          .child(`players/${props.location.state.nickname.nickname}`)
          .update({
            answer,
            correct_answers,
            entered: true,
            last_correct,
            points,
            score,
            streak
          });
          setAnswered( true )
      });

      


    } // end of else
  };

  if (!props.location.state) return <Redirect to="/" />;


  const nextQuestion = () => {
    if (questionCount === 10) {
      gameRef.child('gameEnd').set(true)
      setGameEnded(true); /// change to
    } else {
      gameRef.child('nextQuestion').set( true ) // this sets to 20 (arbitrary) to navigate to execute code above line 37
    }
  };

  const skipQuestion = () => {
    setCount(0);
    gameRef.child('go_to_scoreboard').set(true)

  };

  if (count > 0 && !answered ) {
    return (
      <div className="display_game">
        <Question question={questionList[questionCount - 1].content} />
        <Timer
          skip_question={skipQuestion}
          state={props.location.state}
          adjustCount={setCount}
          count={count}
        />
        <h1 className="question_count">Question {questionCount} of 10</h1>
        <SelectAnswerButton
          getAnswer={_submitAnswer}
          nickname={props.location.state.nickname}
          answers={questionList[questionCount - 1].answers}
        />
      </div>
    );
  } else if ( count > 0 && answered  && isLastCorrect ){
    return (
      <CorrectAnswer resetTimer={ setCount } resetAnswer={ setAnswered } score={scoreTrack} gamesPin={ games_pin } count={ count }/>
    )
  } else if (count > 0 && answered && !isLastCorrect ){
    return (
      <WrongAnswer resetTimer={setCount} resetAnswer={setAnswered} score={scoreTrack} gamesPin={games_pin} />
    )
  }
    else if (gameEnded === true) {
    return <Redirect to={{
      pathname: "/post-game",
      state: {
        pin: games_pin
      }
    }} />;
  } 
  else if ( count === 0 ){
 
    return (
      <>
        <Scoreboard
          question_id={props.location.next_question_id}
          question={questionList[questionCount - 1].content}
          answers={questionList[questionCount - 1].answers}
          question_number={questionCount}
          next_question_nav={nextQuestion}
          game_pin={props.location.state.gamePin}
          getAnswer={_submitAnswer}

        />
      </>
    );
  }
};

export default PlayGame;
