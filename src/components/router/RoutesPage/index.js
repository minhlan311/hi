/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import ProgressBar from 'react-bootstrap/ProgressBar'

import PrivateRoute from '../PrivateRoute'
import PublicRoute from '../PublicRoute'

const RoutesPage = ({ routesItem, isAuthenticated }) => (
    <Suspense
        fallback={
            <ProgressBar className="mtz-progressbar mtz-progressbar--fixed" />
        }
    >
        <Switch>
            {routesItem.map((route) => {
                if (route?.requiredAuthen) {
                    if(route.path.includes('payment')) {
                        const url = window.location.href;
                        window.localStorage.setItem('urlCallback', url);
                    }
                    return (
                        <PrivateRoute
                            key={route?.path}
                            isAuthenticated={isAuthenticated}
                            {...route}
                        />
                    )
                }

                return <PublicRoute key={route?.path} {...route} />
            })}
        </Switch>
    </Suspense>
)

RoutesPage.propTypes = {
    routesItem: PropTypes.array,
    isAuthenticated: PropTypes.bool,
}

RoutesPage.defaultProps = {
    routesItem: [],
    isAuthenticated: false,
}

export default memo(RoutesPage)
