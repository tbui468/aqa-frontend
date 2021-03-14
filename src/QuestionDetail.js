import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PopupBox from './PopupBox';
import { useParams } from 'react-router';
import AnswerForm from './AnswerForm';

const QuestionDetail = (props) => {
    //questions/:question_id/answers/:answer_id/votes   -> POST here to create/update votes
    //questions/:question_id/answers/:answer_id/votes   -> GET here to get all votes for a given answer
    //votes need to go to a particular answer....
    const { question_id } = useParams();
    const history = useHistory();
    const [values, setValues] = useState({
        question: '',
        author: '',
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    const [answerFormVisible, setAnswerFormVisible] = useState(false);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = () => {
        fetch('http://localhost:3000/questions/' + question_id)
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
                        percent: json.answers[i].answer_percent * 100,
                        date: json.answers[i].answer_date,
                        vote: json.answers[i].vote_id,
                        answer_id: json.answers[i].answer_id
                    };
                    arr.push(obj);
                }
                setValues((values) => ({
                    question: json.question.question_text,
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
        <div>
            <h1>Question Detail Page for item: {question_id}</h1>
            <h2>{values.question}</h2>
            <p>{values.author}</p>
            <p>{values.date}</p>
            <PopupBox onClose={closeAnswerForm} visible={answerFormVisible} 
            forms={
                <AnswerForm
                    onSubmit={submitAnswerForm}
                />
            }
            />
            {props.user ? (<button onClick={openAnswerForm}>Post New Answer</button>) : (<div></div>)}
            <ul>
                {values.answers.map((item, index) => {
                    return (
                        <li key={item.answer_id}>
                            <p>Answer: {item.answer} with {item.percent}% of weighted votes</p>
                            <p>by: {item.author}</p>
                            <p>date posted: {item.date}</p>
                            <p>vote: {item.vote}</p>
                            {props.user ? (
                                <form onSubmit={voteFor}>
                                    <input name="answer_id" value={item.answer_id} hidden />
                                    <button type="submit" >Vote</button>
                                </form>
                            ) : (
                                <div></div>
                            )}
                            <p>id: {item.answer_id}</p>
                            <br/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionDetail;
