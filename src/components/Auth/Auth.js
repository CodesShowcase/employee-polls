import React from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userID: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const { dispatch } = this.props;
    const userID = event.target.elements.userid.value;
    if (userID === '') { alert( 'Please select a valid user!' ); }
    else { dispatch(setAuthedUser(userID)); }
    event.preventDefault();
  }
  render() {

    const {users} = this.props;

    return (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/logo.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={this.handleSubmit} data-testid="submit-form">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <h3 className="mt-6 text-center text-1xl font-extrabold text-gray-900">Username</h3><br/>
                  <select id='userid' data-testid='userid' value={this.state.value} onChange={this.handleChange}>
                    {users.map((user) => (
                        // Key is also needed
                        <option key={user.vName} value={user.vName}>
                            {user.rName}
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit" data-testid="submit-btn" id="submit-btn"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users).map((id) => ({ vName: id, rName: users[id].name, })),
    };
}

export default connect(mapStateToProps)(Auth);
