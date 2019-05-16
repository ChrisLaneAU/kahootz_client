import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./PlayGame.scss";
import Timer from "./Timer/Timer";
import Question from "./Question/Question";
import SelectAnswerButton from "./SelectAnswerButton/SelectAnswerButton";
import Scoreboard from "../Scoreboard/Scoreboard";
import { gamesRef } from "../../config/firebase";

const PlayGame = props => {
  const [count, setCount] = useState(20); //timer count
  const [questionCount, setQuestionCount] = useState(1);
  const [gameEnded, setGameEnded] = useState(false); // question count
  const [isLastCorrect, setIsLastCorrect] = useState(0);
  const games_pin = props.location.state.gamePin;
  const gameRef = gamesRef.child(games_pin);

  let questionList = [];

  gameRef.once("value", snapshot => {
    questionList = snapshot.val().questions;
  });

  const _submitAnswer = (answer, correct) => {
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
          correct_answers = correct_answers++;
          last_correct = true;
          points = 1;
          score = score + points;
          streak = streak++;
        } else {
          streak = 0;
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
      });
  };

  if (!props.location.state) return <Redirect to="/" />;

  const nextQuestion = () => {
    if (questionCount === 10) {
      setGameEnded(true); /// change to
    } else {
      setCount(20);
      setQuestionCount(questionCount + 1);
    }
  };

  const skipQuestion = () => {
    setCount(0);
  };

  if (count > 0) {
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
  } else if (gameEnded === true) {
    return <Redirect to="/post-game" />;
  } else {
    return (
      <>
        <Scoreboard
          question_id={props.location.next_question_id}
          question={questionList[questionCount - 1].content}
          answers={questionList[questionCount - 1].answers}
          question_number={questionCount}
          next_question_nav={nextQuestion}
          games_pin={props.games_pin}
        />
      </>
    );
  }
};

export default PlayGame;
