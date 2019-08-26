import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <div>No feedback given</div>;
  }

  const average = (good - bad) / all;
  const positive = good / all;
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}></Statistic>
        <Statistic text="neutral" value={neutral}></Statistic>
        <Statistic text="bad" value={bad}></Statistic>
        <Statistic text="all" value={all}></Statistic>
        <Statistic text="average" value={average}></Statistic>
        {/* A hack to create percentage */}
        <Statistic text="positive" value={positive * 100 + ' %'}></Statistic>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={'good'} handleClick={() => setGood(good + 1)}></Button>
      <Button
        name={'neutral'}
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button name={'bad'} handleClick={() => setBad(bad + 1)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
