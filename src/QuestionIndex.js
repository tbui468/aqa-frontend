import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionSummary from './QuestionSummary';
import PopupBox from './PopupBox';
import QuestionForm from './QuestionForm';
import './questionIndex.css';

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

    useEffect(() => {
        updateIndex();
    }, []);

    const updateIndex = () => {
        fetch('http://localhost:3000/questions', {
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
                        topic: json[i].question_topic,
                        author: json[i].user_name,
                        date: json[i].question_date
                    };
                    arr.push(s);
                }
                setQuestionSummaries(arr);
            });
    };

    const openQuestionForm = () => {
        props.toggleOverlay();
        setVisible(true);
    };

    const closeQuestionForm = () => {
        props.toggleOverlay();
        setVisible(false);
    };

    const submitQuestionForm = (data) => {
        fetch('http://localhost:3000/questions', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json; charset=UTF-8' }
        }).then((result) => {
            closeQuestionForm();
            updateIndex();
        });
    };


    return (
        <div>
            <PopupBox onClose={closeQuestionForm} visible={visible}
                forms={
                    <QuestionForm
                        onSubmit={submitQuestionForm}
                    />
                }
            />
            <section className="question-index-container">
                <h1>Newest Questions</h1>
                {props.user ? (<button onClick={openQuestionForm}>New question</button>) : (<div></div>)}
                <ul>
                    {questionSummaries.map((item, index) => {
                        return (
                            <li key={index}>
                                <QuestionSummary
                                    id={item.id.toString()}
                                    question={item.question}
                                    topic={item.topic}
                                    author={item.author}
                                    date={item.date}
                                />
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
};

export default QuestionIndex;
