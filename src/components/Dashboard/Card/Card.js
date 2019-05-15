import React, { Component } from "react";
import "./Card.scss";
import gk from "./img/generalknowledge.jpg";
import boardgame from "./img/boardgame.jpg";
import books from "./img/books.jpg";
import cartoon from "./img/cartoon.jpg";
import celebrity from "./img/celebrity.jpg";
import computer from "./img/computer.jpg";
import film from "./img/film.jpg";
import geo from "./img/geography.jpg";
import history from "./img/history.jpg";
import manga from "./img/manga.jpg";
import music from "./img/music.jpg";
import myth from "./img/myth.jpg";
import nature from "./img/nature.jpg";
import sport from "./img/sport.jpg";
import tele from "./img/television.jpg";
import vehicle from "./img/vehicle.jpg";
import video from "./img/videogame.jpg";

class Card extends Component {
  getImage() {
    const { category } = this.props;
    switch (category) {
      case "General Knowledge":
        return gk;
      case "Entertainment: Books":
        return books;
      case "Entertainment: Film":
        return film;
      case "Entertainment: Music":
        return music;
      case "Entertainment: Television":
        return tele;
      case "Entertainment: Video Games":
        return video;
      case "Entertainment: Board Games":
        return boardgame;
      case "Science & Nature":
        return nature;
      case "Science: Computers":
        return computer;
      case "Mythology":
        return myth;
      case "Sports":
        return sport;
      case "Geography":
        return geo;
      case "History":
        return history;
      case "Celebrities":
        return celebrity;
      case "Vehicles":
        return vehicle;
      case "Entertainment: Japanese Anime & Manga":
        return manga;
      case "Entertainment: Cartoon & Animations":
        return cartoon;
      default:
        console.log("Image NOT Found");
        break;
    }
  }

  render() {
    return (
      <div className="card" onClick={this.props.onClick(this.props.questions)}>
        <div className="card__header">
          <img className="card__header--image" src={this.getImage()} alt="" />
        </div>
        <div className="card__body">
          <div className="card__body--category">
            <h3>{this.props.category}</h3>
          </div>
          <div className="card__body--difficulty">
            <h3>Difficulty</h3>
            <p>{this.props.difficulty}</p>
          </div>
          <div className="card__body--questions">
            <h3>Number Of Question</h3>
            <p>{this.props.questions.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
