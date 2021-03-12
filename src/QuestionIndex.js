import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionSummary from './QuestionSummary';
import PopupBox from './PopupBox';

const QuestionIndex = (props) => {
    const [questionSummaries, setQuestionSummaries] = useState([
        {
            id: 0,
            question: 'Are birds real?',
            author: '',
            date: ''
        }
    ]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/questions', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json();
            })
            .then((json) => {
                console.log(json);
                const arr = [];
                for (let i = 0; i < 3; i++) {
                    const s = {
                        id: json[i].question_id,
                        question: json[i].question_text,
                        author: json[i].user_name,
                        date: json[i].question_date
                    };
                    arr.push(s);
                }
                setQuestionSummaries(arr);
            });
    }, []); //empty update array so that fetch is only called on mount of component

    const openQuestionForm = () => {
        props.toggleFade();
        setVisible(true);
    };

    const closeQuestionForm = () => {
        props.toggleFade();
        setVisible(false);
    };

    const submitQuestionForm = (e) => {
        e.preventDefault();
        alert('submitted');
        //upload a question here using data from 
    }

    return (
        <div>
            <PopupBox onClose={closeQuestionForm} onSubmit={submitQuestionForm} visible={visible} />
            <button onClick={openQuestionForm}>New question</button>
            <ul>
                {questionSummaries.map((item, index) => {
                    return (
                        <li key={index}>
                            <QuestionSummary
                                id={item.id.toString()}
                                question={item.question}
                                author={item.author}
                                date={item.date}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionIndex;
