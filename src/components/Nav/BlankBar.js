import { Disclosure } from '@headlessui/react'
import { connect } from 'react-redux'

const Blankbar = (props) => {

  if (props.authedUser !== null) { return null; }
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
                        className="h-8 w-8"
                        src="/logo.png"
                        alt="Workflow"
                      />
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
    authedUser: state.authedUser
  };
};
export default connect(mapStateToProps)(Blankbar);
