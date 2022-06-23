import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { handleAddAnswer } from '../../actions/shared';
import NotFound from '../Nav/404';

const PollDetails = (props) => {
  const { dispatch, authedUser, users, questions } = props;
  const { question_id } = useParams();
  const [setOptionOne] = useState('');
  const [setOptionTwo] = useState('');
  const navigate = useNavigate();

  let allQuestions = [];
  for (let i=0; i < Object.keys(questions).length; i++) {
    let id = Object.keys(questions)[i];
    allQuestions.push(id);
  }
  const exists = allQuestions.includes(question_id)?true:false;

  if (exists) {

  const dQuestion = questions[question_id];
  let answered = (dQuestion.optionOne.votes.includes(authedUser) || dQuestion.optionTwo.votes.includes(authedUser))? true : false ;
  const vOptionOne = dQuestion.optionOne.votes.length;
  const vOptionTwo = dQuestion.optionTwo.votes.length;



  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = `${date}. ${month} ${year}`;
    return time;
  }

  const handleChange = (event) => {
    event.preventDefault();
    const answer = event.target.value;
    const qid = question_id;
    dispatch(handleAddAnswer({ authedUser, qid, answer }));
    navigate(`/questions/${question_id}`);
  }



  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Poll Details</h1>
        </div>
      </header>

      {!answered &&
        <section className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2">
              <div className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                <img src={users[dQuestion.author].avatarURL} className="w-1/4 lg:w-1/4 rounded-l-2xl" alt="Avatar" />
                <div className="p-4 bg-gray-50">
                  <h2 className="mb-2 text-xl font-bold text-gray-900">Would you rather:</h2>
                  <div className="text-left" onChange={handleChange}>
                      <input id="optionOne-radio" type="radio" value="optionOne" onChange={(e) => setOptionOne(e.target.value)} name="optionOne-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label className="ml-2 text-sm font-medium text-gray-600">{dQuestion.optionOne.text}</label>
                  <p className="text-sm text-gray-600 text-center">or</p>
                      <input id="optionTwo-radio" type="radio" value="optionTwo" onChange={(e) => setOptionTwo(e.target.value)} name="optionTwo-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label className="ml-2 text-sm font-medium text-gray-600">{dQuestion.optionTwo.text}</label>
                  </div>
                  <p className="text-sm text-gray-600">By: {dQuestion.author} | Date: {timeConverter(dQuestion.timestamp)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {answered &&
        <section className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2">
              <Link to='/'>
                <div className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                  <img src={users[dQuestion.author].avatarURL} className="w-1/4 lg:w-1/4 rounded-l-2xl" alt="Avatar" />
                  <div className="p-4 bg-gray-50">
                    <h2 className="mb-2 text-xl font-bold text-gray-900">Would you rather:</h2>
                    <p className="text-sm text-gray-600">{dQuestion.optionOne.text}</p>
                    <p className="text-sm text-gray-600">or</p>
                    <p className="text-sm text-gray-600">{dQuestion.optionTwo.text}</p>
                    <p className="text-sm text-gray-600">One{(dQuestion.optionOne.votes.includes(authedUser))?' (you)':''}: {vOptionOne} - {(vOptionOne/(vOptionOne+vOptionTwo)*100).toFixed(2)}% | Two{(dQuestion.optionTwo.votes.includes(authedUser))?' (you)':''}: {vOptionTwo} - {(vOptionTwo/(vOptionOne+vOptionTwo)*100).toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">By: {dQuestion.author} | Date: {timeConverter(dQuestion.timestamp)}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      }

    </div>
  )} else {
    return (
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Poll Details</h1>
          </div>
        </header>

        <NotFound />
      </div>
    )}
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions
  };
};

export default connect(mapStateToProps)(PollDetails);
