import React from "react";
import { Link } from "react-router-dom";
import "./SelectAnswerButton.scss"





const SelectAnswerButton = ({ answers }) => {
  
  const styleList = ["answerbuttonBlue", "answerbuttonGreen", "answerbuttonYellow", "answerbuttonRed"]
  const getStyle = function (){
    
    let len = styleList.length;
    let randomNum = Math.floor(Math.random()*len);
    let style = styleList[randomNum];
    styleList.splice(randomNum, 1);
    return style;
}
  const renderAnswers = answers.map(answer => {
    return (
      
      
      
      <div className = {getStyle()}>
        <div className="answerbutton__answer" key={answer.id}>
        <Link className="answerbutton__answertext" to="/post-game">{answer.answer}</Link>
            
        </div>
      </div>
 
          );
  });

  return (
    <>
    <div className = "display">
      {renderAnswers}
      </div>
    </>
  );
};

export default SelectAnswerButton;
