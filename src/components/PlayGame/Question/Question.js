import React from "react";
import "./Question.scss";

const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement("div");

  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
  }

  return decodeHTMLEntities;
})();

const Question = ({ question }) => {
  const questionDecoded = decodeEntities(question);
  return (
    <div className="question">
      <p>{questionDecoded}</p>
    </div>
  );
};

export default Question;
