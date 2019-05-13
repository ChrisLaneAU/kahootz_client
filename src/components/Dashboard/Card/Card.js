import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Card.scss"
import gk from './img/generalknowledge.jpg';
import boardgame from './img/boardgame.jpg';
import books from './img/books.jpg';
import cartoon from './img/cartoon.jpg';
import celebrity from './img/celebrity.jpg';
import computer from './img/computer.jpg';
import film from './img/film.jpg';
import geo from './img/geography.jpg';
import history from './img/history.jpg';
import manga from './img/manga.jpg';
import music from './img/music.jpg';
import myth from './img/myth.jpg';
import nature from './img/nature.jpg';
import sport from './img/sport.jpg';
import tele from './img/television.jpg';
import vehicle from './img/vehicle.jpg';
import video from './img/videogame.jpg';

class Card extends Component {
    getImage() {
        const { category } = this.props 
         switch (category)
         {
             case "General Knowledge":
                return gk;
                break;
            case "Entertainment: Books":
                return books
                break;
            case "Entertainment: Film":
                return film
                break;
            case "Entertainment: Music":
                return music
                break;
            case "Entertainment: Television":
                return tele
                break;
            case "Entertainment: Video Games":
                return video
                break;
            case "Entertainment: Board Games":
                return boardgame
                break;
            case "Science & Nature":
                return nature
                break;
            case "Science: Computers":
                return computer
                break;
            case "Mythology":
                return myth
                break;
            case "Sports":
                return sport
                break;
            case "Geography":
                return geo
                break;
            case "History":
                return history
                break;
            case "Celebrities":
                return celebrity
                break;
            case "Vehicles":
                return vehicle
                break;
            case "Entertainment: Japanese Anime & Manga":
                return manga
                break;
            case "Entertainment: Cartoon & Animations":
                return cartoon
                break;
            default: 
                console.log("Image NOT Found");
                break;
         }
        }

    render() {
        return (
            <div className="card">
                <div className="card__header">
                    <img className="card__header--image" src={this.getImage()} alt=""/>               
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
        )
    }
}

export default Card;