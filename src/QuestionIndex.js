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
                        date: json[i].question_date
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
