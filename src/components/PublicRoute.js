import React from 'react'
import {Route} from 'react-router-dom'

function PublicRoute({component:Component, ...resProps}){

    return (
        <Route 
            {...resProps}
            render={() => {
                return <Component {...resProps} />
            }}
        />
    )


}

export default PublicRoute;