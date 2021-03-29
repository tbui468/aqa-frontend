import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PopupBox from './PopupBox';
import QuestionForm from './QuestionForm';
import { BACKEND_DOMAIN } from './Globals';
import TopicDisplay from './TopicDisplay';

const QuestionIndex = (props) => {
    const [questionSummaries, setQuestionSummaries] = useState([
        {
            id: 0,
            question: 'Are birds real?',
            topic: 'none',
            author: '',
            date: ''
        }
    ]);

    const [visible, setVisible] = useState(false);

    const updateIndex = () => {
        fetch(BACKEND_DOMAIN + 'questions', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json();
            })
            .then((json) => {
                const arr = [];
                for (let i = 0; i < json.length; i++) {
                    const s = {
                        id: json[i].question_id,
                        question: json[i].question_text,
                        topic: json[i].question_topic ? json[i].question_topic : "topic pending",
                        date: json[i].question_date,
                        question_weight: json[i].question_weight,
                        top_answer: json[i].top_answer ? json[i].top_answer.answer_text : null,
                        answer_weight: json[i].top_answer ? json[i].top_answer.answer_weight: 0
                    };
                    arr.push(s);
                }
                setQuestionSummaries(arr);
            });
    };

    useEffect(() => {
        updateIndex();
    }, []);


    const openQuestionForm = () => {
        props.toggleOverlay();
        setVisible(true);
    };

    const closeQuestionForm = () => {
        props.toggleOverlay();
        setVisible(false);
    };

    const submitQuestionForm = (data) => {
        fetch(BACKEND_DOMAIN + 'questions', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((result) => {
            closeQuestionForm();
            updateIndex();
        });
    };


    return (
        <section className="row">
            <PopupBox onClose={closeQuestionForm} visible={visible}
                forms={
                    <QuestionForm
                        onSubmit={submitQuestionForm}
                    />
                }
            />
            <div className="grid">
                <section className="col-2-5">
                    <TopicDisplay user={props.user} />
                </section>
                <section className="col-3-5">
                    <h1>Newest Questions</h1>
                    {props.user ? (<button onClick={openQuestionForm}>New question</button>) : (<div />)}
                    <table>
                        <tbody>
                            {questionSummaries.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                to={'/questions/' + item.id.toString()}
                                                dangerouslySetInnerHTML={{ __html: item.question }} />
                                            <p>{item.topic}</p>
                                            <p>{item.date}</p>
                                            {parseFloat(item.question_weight) == 0 ?
                                                (
                                                    <p>No Answers Posted Yet</p>
                                                ):(
                                                    <div>
                                                        <p dangerouslySetInnerHTML={{ __html: item.top_answer }} />
                                                        <svg height="20px">
                                                            <g>
                                                                <rect
                                                                    width={parseFloat(item.answer_weight) / parseFloat(item.question_weight) * 100}
                                                                    height="20"
                                                                >
                                                                </rect>
                                                                <text
                                                                    x={parseFloat(item.answer_weight) / parseFloat(item.question_weight) * 100 + 5}
                                                                    y={9.5} 
                                                                    dy=".35em"
                                                                >
                                                                    {Math.round(parseFloat(item.answer_weight) / parseFloat(item.question_weight) * 10000) / 100}%
                                                                </text>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
        </section>
    );
};


QuestionIndex.propTypes = {
    user: PropTypes.object,
    toggleOverlay: PropTypes.func
};

export default QuestionIndex;
