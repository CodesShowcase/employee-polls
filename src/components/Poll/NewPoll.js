import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../../actions/shared';

const NewPoll = (props) => {
  const {dispatch, authedUser} = props;
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (optionOne.length !== 0 && optionTwo.length !== 0) {
      dispatch(handleAddQuestion(optionOne, optionTwo, authedUser));

      navigate('/');
    } else {
      alert('You need to state both options!');
    }
  }

  return (
    <div>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">New Poll</h1>
        </div>
      </header>

      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2">
            <div className="m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg">
              <div className="p-6 bg-gray-50">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Would you rather:</h2>
                <form className="choice" onSubmit={handleSubmit}>
                  <input
                    placeholder="Option One"
                    name="optionOneText"
                    value={optionOne}
                    onChange={(e) => setOptionOne(e.target.value)}
                    className="OptionOne"
                    data-testid="optionOne"
                    type="text"
                    size="50"
                  />
                  <p className="m-2 text-gray-600">or</p>
                  <input
                    placeholder="Option Two"
                    name="optionTwo"
                    onChange={(e) => setOptionTwo(e.target.value)}
                    className="optionTwo"
                    data-testid="optionTwo"
                    type="text"
                    size="50"
                  />
                  <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )}

  const mapStateToProps = state => {
    return {
      authedUser: state.authedUser
    };
  };

export default connect(mapStateToProps)(NewPoll);
