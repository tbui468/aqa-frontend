import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const QuestionDetail = ({ match }) => {
    const history = useHistory();
    const [values, setValues] = useState({
        question: '',
        author: '',
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    useEffect(() => {
        fetch('http://localhost:3000/questions/' + match.params.question_id)
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
                        date: json.answers[i].answer_date
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
    }, []);


    const handleClick = (e) => {
        history.push('/questions/' + match.params.question_id + '/answers/new');
    };

    return (
        <div>
            <h1>Question Detail Page for item: {match.params.id}</h1>
            <h2>{values.question}</h2>
            <p>{values.author}</p>
            <p>{values.date}</p>
            <button onClick={handleClick}>Post New Answer</button>
            <ul>
                {values.answers.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>Answer: {item.answer} with {item.percent}% of weighted votes</p>
                            <p>by: {item.author}</p>
                            <p>date posted: {item.date}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionDetail;
