import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({
    path,
    exact,
    isAuthenticated,
    component: Component,
}) => (
    <Route
        exact={exact}
        path={path}
        render={(routeProps) => {
            const { pathname, search } = routeProps?.location || {}
            return isAuthenticated ? (
                <Component {...routeProps} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: { pathname: `${pathname}${search}` } },
                    }}
                />
            )
        }}
    />
)

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
        .isRequired,
}

PrivateRoute.defaultProps = { isAuthenticated: false }

export default memo(PrivateRoute)
