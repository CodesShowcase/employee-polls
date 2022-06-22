import { connect } from 'react-redux';

const Leaderboard = (props) => {
  const { users } = props;

  let leaderArr = [];
  for (let i=0; i < Object.keys(users).length; i++) {
    const user = users[Object.keys(users)[i]];
    const name = users[Object.keys(users)[i]].name;
    const avatar = users[Object.keys(users)[i]].avatarURL;
    const asked = user.questions.length;
    const answered = Object.keys(user.answers).length;
    const total = asked + answered;
    const objArr = {name: name, avatar: avatar, asked: asked, answered: answered, total: total};
    leaderArr.push(objArr);
  }

  leaderArr.sort(multiSort);

  function multiSort(a, b) {
      if (a.total === b.total) {
          return 0;
      }
      else {
          return (a.total > b.total) ? -1 : 1;
      }
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>
      </header>

      <div className="grid lg:grid-cols-2">
        {leaderArr.map((user,key)=>
              <div key={key} className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
                <img src={user.avatar} className="w-1/1 lg:w-1/2 rounded-l-2xl" alt="Avatar" />
                <div className="p-6 bg-gray-50">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">Asked: {user.asked}</p>
                    <p className="text-gray-600">Answered: {user.answered}</p>
                    <p className="text-gray-600">Total: {user.total}</p>
               </div>
             </div>
        )}
      </div>

    </div>
  )}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    users: state.users
  };
};

export default connect(mapStateToProps)(Leaderboard);
