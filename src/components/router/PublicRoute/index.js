import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const PublicRoute = ({ path, exact, component: Component }) => {
    return <Route path={path} exact={exact} component={Component} />
}

PublicRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
        .isRequired,
}

PublicRoute.defaultProps = {}

export default memo(PublicRoute)
