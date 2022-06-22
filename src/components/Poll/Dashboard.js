import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  const { authedUser, users, questions } = props;
  const answers = users[authedUser].answers;

  let allQuestions = [];
  for (let i=0; i < Object.keys(questions).length; i++) {
    let id = Object.keys(questions)[i];
    allQuestions.push(questions[id]);
  }

  const qIDs = Object.keys(answers).map((key) => ({question: key}));

  allQuestions.sort(multiSort);

  let aQuestions = allQuestions.filter(({ id: id1 }) => qIDs.some(({ question: id2 }) => id2 === id1));
  let uQuestions = allQuestions.filter(({ id: id1 }) => !qIDs.some(({ question: id2 }) => id2 === id1));

  aQuestions = aQuestions.map((item) => ({id: item.id, user: users[authedUser].name, author: users[item.author].name, avatar: users[item.author].avatarURL, choice: item.optionOne.votes.includes(authedUser)?'OptionOne':'OptionTwo', optionOne: item.optionOne.text, optionTwo: item.optionTwo.text, vOptionOne: item.optionOne.votes.length, vOptionTwo: item.optionTwo.votes.length, timestamp: timeConverter(item.timestamp)}));
  uQuestions = uQuestions.map((item) => ({id: item.id, user: users[authedUser].name, author: users[item.author].name, avatar: users[item.author].avatarURL, choice: '', optionOne: item.optionOne.text, optionTwo: item.optionTwo.text, vOptionOne: item.optionOne.votes.length, vOptionTwo: item.optionTwo.votes.length, timestamp: timeConverter(item.timestamp)}));

  function multiSort(a, b) {
      if (a.timestamp === b.timestamp) {
          return 0;
      }
      else {
          return (a.timestamp > b.timestamp) ? -1 : 1;
      }
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = `${date}. ${month} ${year}`;
    return time;
  }

  return (
    <div>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Unanswered</h2>
          <div className="grid lg:grid-cols-2">
            {uQuestions.map((question,key)=>
              <Link key={key} to={`/questions/${question.id}`}>
                <div className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                  <img src={question.avatar} className="w-1/4 lg:w-1/4 rounded-l-2xl" alt="Avatar" />
                  <div className="w-3/4 lg:w-3/4 p-4 bg-gray-50">
                    <h2 className="mb-2 text-xl font-bold text-gray-900">Would you rather:</h2>
                    <p className="text-sm text-gray-600">{question.optionOne}</p>
                    <p className="text-sm text-gray-600">or</p>
                    <p className="text-sm text-gray-600">{question.optionTwo}</p>
                    <p className="text-sm text-gray-600">By: {question.author} | Date: {question.timestamp}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Answered</h2>
          <div className="grid lg:grid-cols-2">
            {aQuestions.map((question,key)=>
              <Link key={key} to={`/questions/${question.id}`}>
                <div className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                  <img src={question.avatar} className="w-1/4 lg:w-1/4 rounded-l-2xl" alt="Avatar" />
                  <div className="w-3/4 lg:w-3/4 p-4 bg-gray-50">
                    <h2 className="mb-2 text-xl font-bold text-gray-900">Would you rather:</h2>
                    <p className="text-sm text-gray-600">{question.optionOne}</p>
                    <p className="text-sm text-gray-600">or</p>
                    <p className="text-sm text-gray-600">{question.optionTwo}</p>
                    <p className="text-sm text-gray-600">One{(question.choice === 'OptionOne')?' (you)':''}: {question.vOptionOne} - {(question.vOptionOne/(question.vOptionOne+question.vOptionTwo)*100).toFixed(2)}% | Two{(question.choice === 'OptionTwo')?' (you)':''}: {question.vOptionTwo} - {(question.vOptionTwo/(question.vOptionOne+question.vOptionTwo)*100).toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">By: {question.author} | Date: {question.timestamp}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  )}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions
  };
};

export default connect(mapStateToProps)(Dashboard);
