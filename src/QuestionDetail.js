import React, { useState, useEffect } from 'react';
import PopupBox from './PopupBox';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import AnswerForm from './AnswerForm';

const QuestionDetail = (props) => {
    const { questionId } = useParams();
    const [values, setValues] = useState({
        question: '',
        topic: '',
        author: '',
        owns: false, //whether user wrote the question or not
        answered: false, //whether user has answered this question (once) or not
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    const [answerFormVisible, setAnswerFormVisible] = useState(false);


    const getDetails = () => {
        fetch('http://localhost:3000/questions/' + questionId, {
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
                let alreadyAnswered = false;
                for (let i = 0; i < json.answers.length; i++) {
                    let obj = {
                        answer: json.answers[i].answer_text,
                        author: json.answers[i].user_name,
                        percent: Math.round(json.answers[i].answer_percent * 10000) / 100, //can we compute this client side???
                        date: json.answers[i].answer_date,
                        vote: json.answers[i].voted, //should compute client-side
                        owns: json.answers[i].owns, //if true, disable vote button for that answer - should compute client-side
                        answer_id: json.answers[i].answer_id
                    };
                    if (json.answers[i].owns) alreadyAnswered = true;
                    arr.push(obj);
                }
                setValues((values) => ({
                    question: json.question.question_text,
                    topic: json.question.question_topic,
                    author: json.question.user_name,
                    date: json.question.question_date,
                    owns: json.question.owns, //if true, disable post answer button (should compute this client-side)
                    answered: alreadyAnswered, //should compute this client side
                    answers: arr
                }));
            });
    };

    useEffect(() => {
        getDetails(); //this needs to be called when user logs in
    }, []);


    const openAnswerForm = () => {
        props.toggleOverlay();
        setAnswerFormVisible(true);
    };

    const closeAnswerForm = () => {
        props.toggleOverlay();
        setAnswerFormVisible(false);
    };

    const submitAnswerForm = (data) => {
        fetch('http://localhost:3000/questions/' + questionId + '/answers', {
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
        const answerId = e.target.answer_id.value;
        fetch('http://localhost:3000/questions/' + questionId + '/answers/' + answerId + '/votes', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        }).then((result) => {
            getDetails();
        });
    };

    return (
        <section className="row">
            <PopupBox onClose={closeAnswerForm} visible={answerFormVisible}
                forms={
                    <AnswerForm
                        onSubmit={submitAnswerForm}
                    />
                }
            />
            <div className="container group question-summary">
                <h1 dangerouslySetInnerHTML={{ __html: values.question }} />
                <h2>{values.topic}</h2>
                <p>{values.date}</p>
                {props.user ? (
                    <button onClick={openAnswerForm} disabled={values.owns || values.answered}>
                        Post New Answer
                    </button>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="container answers-list">
                <table>
                    <tbody>
                        {values.answers.map((item, index) => {
                            return (
                                <tr>
                                    <td key={item.answer_id}>
                                        <h3 dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        <p>{item.percent}% of weighted votes</p>
                                        <p>{item.date}</p>
                                        {props.user ? (
                                            <form onSubmit={voteFor}>
                                                <input name="answer_id" value={item.answer_id} hidden />
                                                <button
                                                    className=
                                                        {item.vote ?
                                                            "vote-active" :
                                                            "vote-inactive"
                                                        }
                                                    type="submit"
                                                    disabled={item.owns}>
                                                    Vote
                                                </button>
                                            </form>
                                        ) : (
                                            <div></div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

QuestionDetail.propTypes = {
    user: PropTypes.object,
    toggleOverlay: PropTypes.func
};

export default QuestionDetail;
