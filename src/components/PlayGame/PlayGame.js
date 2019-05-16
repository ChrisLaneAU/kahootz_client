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

const PlayGame = props => {
  const [count, setCount] = useState(20); //timer count
  const [questionCount, setQuestionCount] = useState(1); // question count
  const [gameEnded, setGameEnded] = useState(false); 
  const [isLastCorrect, setIsLastCorrect] = useState(0);
  const [answered, setAnswered ] = useState(false)
  const [currentQ, setcurrentQ] = useState(0)
  const [ scoreTrack, setScore ] = useState(0) // keeps track of last score 
  const [ globalTimer, setGTimer ] = useState(false)

  const games_pin = props.location.state.gamePin;
  const gameRef = gamesRef.child(games_pin);

  let questionList = [];

  gameRef.once("value", snapshot => {
    questionList = snapshot.val().questions;
  });

  gameRef.on("value", snapshot => { /// this allows the admin to skip a question globally
    if ( snapshot.val().timerReset === 0 ){
      setCount(0)
      gameRef.child('timerReset').set(1)
    }

    if ( snapshot.val().newTimer === 20 ){
      setCount( 20 );
      setQuestionCount( questionCount + 1 )
      gameRef.child('newTimer').set(false)
    }

    if ( snapshot.val().getOffResult === 0 ){ // navs from the interim results page
      setCount( 0 )
      gameRef.child('getOffResult').set(1)
    }

  })




  const _submitAnswer = (answer, correct) => {
    if (props.location.state.isAdmin){
      return  // this means that admin cant try and answer any questions
    } else {
      console.log('this was clicked');
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
          points = 1;
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
          setcurrentQ( currentQ + 1 )
      });

      


    } // end of else
  };

  if (!props.location.state) return <Redirect to="/" />;


  const nextQuestion = () => {
    if (questionCount === 10) {
      setGameEnded(true); /// change to
    } else {
      gameRef.child('newTimer').set( 20 ) // this sets the next question to true to navigate to the scoreboard
      gameRef.child('nextQuestion').set(questionCount + 1)
    }
  };

  const skipQuestion = () => {
    setCount(0);
    gameRef.child('timerReset').set(0)
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
  } else if ( count > 0 && answered && ( currentQ === questionCount ) && isLastCorrect ){
    return (
      <CorrectAnswer resetTimer={ setCount } resetAnswer={ setAnswered } score={scoreTrack} gamesPin={ games_pin }/>
    )
  } else if (count > 0 && answered && (currentQ === questionCount) && !isLastCorrect ){
    return (
      <WrongAnswer resetTimer={setCount} resetAnswer={setAnswered} score={scoreTrack} gamesPin={games_pin} />
    )
  }
    else if (gameEnded === true) {
    return <Redirect to="/post-game" />;
  } 
  else if ( count === 0 ){
    gameRef.child('getOffResults').set(0)
    return (
      <>
        <Scoreboard
          question_id={props.location.next_question_id}
          question={questionList[questionCount - 1].content}
          answers={questionList[questionCount - 1].answers}
          question_number={questionCount}
          next_question_nav={nextQuestion}
          game_pin={props.location.state.gamePin}
        />
      </>
    );
  }
};

export default PlayGame;
