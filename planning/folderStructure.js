components/
  App.js
  App.scss
  sharedUI/
    Button/
      Button.js
      Button.scss
    Header/
      Header.js
      Header.scss

///////// USER ONLY ////////////

  JoinGame/
    JoinGame.js // :root - Smart component with no UI
    JoinGameForm/
      JoinGameForm.js
      JoinGameForm.scss
    MuteButton/  - // optional
      MuteBotton.js
      MuteButton.scss
  Nickname/
    Nickname.js
    NicknameForm/
      NicknameForm.js
      NicknameForm.scss

///////// USER AND ADMIN ///////////

  WaitingRoom/
    WaitingRoom.js
      GamePin/
        GamePin.js
        GamePin.scss
      UserCount/
        UserCount.js
        UserCount.scss
  PlayGame/
    PlayGame.js // Smart component with no UI
    Question/
      Question.js
      Question.scss
    Timer/
      Timer.js
      Timer.scss
    SelectAnswerButton/
      SelectAnswerButton.js
      SelectAnswerButton.scss
    AnswersCounter/
      AnswersCounter.js
      AnswersCounter.scss
    AwaitingAnswer/
      AwaitingAnswer.js
      AwaitingAnswer.scss
  AnswerBreakdown/
    AnswerBreakdown.js // Smart component with no UI
    Chart/
      Chart.js
      Chart.scss
    CorrectAnswer/
      CorrectAnswer.js
      CorrectAnswer.scss
  LeaderBoard/
    LeaderBoard.js
    LeaderBoard.scss
  PostGame/
    PostGame.js // Smart component with no UI
    Podium/
      Podium.js
      Podium.scss
    Positions/
      Positions.js
      Positions.scss

////// USER ONLY /////////

  PlaceMedal/
    PlaceMedal.js
    PlaceMedal.scss

  GameOver/
    GameOver.js
    GameOver.scss


////// ADMIN ONLY /////////

  Login/
    Login.js
    Login.scss

  SignUp/
    Signup.js
    Signup.scss

  Dashboard/
    Dashboard.js
    Header/ // should be taken from sharedUI
      Header.js
      Header.scss
    Card/
      Card.js
      Card.scss

  CreateQuiz/ // if we get time
    CreateQuiz.js
    Questions/
      Questions.js
      Question/
        Question.js
        Question.scss
      Answer/
        Answer.js
        Answer.scss
    SelectedQuestions/
      SelectedQuestions.js
      QuestionsList/
        QuestionsList.js
        QuestionsList.scss
