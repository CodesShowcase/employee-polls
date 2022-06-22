import { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { logOutUser } from '../../actions/authedUser'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Leaderboard', href: '/leaderboard', current: false },
  { name: 'New Question', href: '/add', current: false },
]

const Navbar = (props) => {
  let navigate = useNavigate();

  if (props.authedUser === null) { return null; }

  const logout = () => {
    props.dispatch(logOutUser());
    navigate("/");
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={props.users[props.authedUser].avatarURL}
                        alt="Avatar"
                      />
                    </div>
                    <div className="ml-2 flex items-baseline space-x-4">
                    <span className='text-gray-300 px-3 py-2 rounded-md text-sm font-medium'><i>{props.users[props.authedUser].name}</i></span>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => (isActive ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium')}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <button onClick={logout} className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Log Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    users: state.users
  };
};
export default connect(mapStateToProps)(Navbar);
