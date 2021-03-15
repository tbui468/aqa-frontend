import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PopupBox from './PopupBox';
import { useParams } from 'react-router';
import AnswerForm from './AnswerForm';
import './questionDetail.css';

const QuestionDetail = (props) => {
    const { question_id } = useParams();
    const history = useHistory();
    const [values, setValues] = useState({
        question: '',
        topic: '',
        author: '',
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    const [answerFormVisible, setAnswerFormVisible] = useState(false);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = () => {
        fetch('http://localhost:3000/questions/' + question_id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                //process array of answers here
                let arr = [];
                for (let i = 0; i < json.answers.length; i++) {
                    let obj = {
                        answer: json.answers[i].answer_text,
                        author: json.answers[i].user_name,
                        percent: Math.round(json.answers[i].answer_percent * 10000) / 100,
                        date: json.answers[i].answer_date,
                        vote: json.answers[i].voted,
                        answer_id: json.answers[i].answer_id
                    };
                    arr.push(obj);
                }
                setValues((values) => ({
                    question: json.question.question_text,
                    topic: json.question.question_topic,
                    author: json.question.user_name,
                    date: json.question.question_date,
                    answers: arr
                }));
            });
    };

    const openAnswerForm = () => {
        props.toggleOverlay();
        setAnswerFormVisible(true);
    };

    const closeAnswerForm = () => {
        props.toggleOverlay();
        setAnswerFormVisible(false);
    };

    const submitAnswerForm = (data) => {
        fetch('http://localhost:3000/questions/' + question_id + '/answers', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((result) => {
            closeAnswerForm();
            getDetails();
        });
    };

    const voteFor = (e) => {
        e.preventDefault();
        const answer_id = e.target.answer_id.value;
        fetch('http://localhost:3000/questions/' + question_id + '/answers/' + answer_id + '/votes', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        }).then((result) => {
            getDetails();
        });
    }

    return (
        <section className="question-detail-container">
            <PopupBox onClose={closeAnswerForm} visible={answerFormVisible} 
            forms={
                <AnswerForm
                    onSubmit={submitAnswerForm}
                />
            }
            />
            <section className="question-detail-question">
                <section className="question-detail-question-text">
                    <h1>{values.question}</h1>
                    <h2>{values.topic}</h2>
                    <p>{values.date}</p>
                </section>
                <section className="question-detail-answer-button">
                {props.user ? (<button className="new-answer-button" onClick={openAnswerForm}>Post New Answer</button>) : (<div></div>)}
                </section>
            </section>
            <section className="question-detail-answers">
                <ul>
                    {values.answers.map((item, index) => {
                        return (
                            <section className="question-detail-answer">
                                <li key={item.answer_id}>
                                    <section className="question-detail-answer-text">
                                        <h3>{item.answer}</h3>
                                        <p>{item.percent}% of weighted votes</p>
                                        <p>{item.date}</p>
                                    </section>
                                    {props.user ? (
                                        <form onSubmit={voteFor} className="question-detail-vote-form">
                                            <input name="answer_id" value={item.answer_id} hidden />
                                            <button className={item.vote ? "vote-button vote-active" : "vote-button vote-inactive"} type="submit" >Vote</button>
                                        </form>
                                    ) : (
                                        <div className="question-detail-vote-form"></div>
                                    )}
                                </li>
                            </section>
                        );
                    })}
                </ul>
            </section>
        </section>
    );
};

export default QuestionDetail;
