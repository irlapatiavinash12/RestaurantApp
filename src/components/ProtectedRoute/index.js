import Cookie from 'js-cookie'

import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const cookie = Cookie.get('jwt_token')

  if (cookie === undefined) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedRoute
