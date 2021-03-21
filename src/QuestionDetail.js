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
        owns: false, //whether user wrote the question or not
        answered: false, //whether user has answered this question (once) or not
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    const [barClass, setBarClass] = useState('percent-bar-default');

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
                    //check if user already voted for the current answer
                    let voted = false;
                    for(let j = 0; j < json.answers[i].answer_votes.length; j++) {
                        if(props.user && json.answers[i].answer_votes[j].vote_user.toString() === props.user.id.toString()) voted = true;
                    }
                    let obj = {
                        answer: json.answers[i].answer_text,
                        percent: Math.round(json.answers[i].answer_weight / json.question.question_weight * 10000) / 100,
                        date: json.answers[i].answer_date,
                        voted: voted, //should compute client-side - what do I need?
                        owns: props.user ? json.answers[i].answer_user.toString() === props.user.id.toString() : false,
                        answer_id: json.answers[i].answer_id
                    };
                    if (props.user ? json.answers[i].answer_user.toString() === props.user.id.toString() : false) alreadyAnswered = true;
                    arr.push(obj);
                }

                arr.sort((a, b) => (parseFloat(a.percent) > parseFloat(b.percent)) ? -1 : 1);

                setValues((values) => ({
                    question: json.question.question_text,
                    topic: json.question.question_topic ? json.question.question_topic : "topic pending",
                    date: json.question.question_date,
                    owns: props.user ? json.question.question_user.toString() === props.user.id.toString() : false,
                    answered: alreadyAnswered,
                    answers: arr
                }));

            });
    };

    useEffect(() => {
        getDetails(); //this needs to be called when user logs in
    }, [props.user]);


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
            setBarClass('percent-bar-default');
            getDetails();
            setBarClass('percent-bar-default percent-bar-full');
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
            <div className="container group">
                <section className="question-summary">
                    <h1 dangerouslySetInnerHTML={{ __html: values.question }} />
                    <h2>{values.topic}</h2>
                    <p>{values.date}</p>
                    {props.user ? (
                        <button onClick={openAnswerForm} disabled={values.owns || values.answered}>
                            Post New Answer
                        </button>
                    ) : (
                        <div />
                    )}
                </section>
            </div>
            <div className="container">
                <table className="answers-table">
                    <tbody>
                        {values.answers.map((item, index) => {
                            return (
                                <tr>
                                    <td key={item.answer_id}>
                                        <h3 dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        <p>{item.percent}% of weighted votes</p>
                                        <div className={barClass}>&nbsp;</div>
                                        <p>{item.date}</p>
                                        {props.user ? (
                                            <form onSubmit={voteFor}>
                                                <input name="answer_id" value={item.answer_id} hidden />
                                                <button
                                                    className=
                                                        {item.voted ?
                                                            "vote-active" :
                                                            ""
                                                        }
                                                    type="submit"
                                                    disabled={item.owns}>
                                                    Vote
                                                </button>
                                            </form>
                                        ) : (
                                            <div />
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
