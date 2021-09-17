import { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface DAWProps {
    
}

const DAW:FC<DAWProps & RouteComponentProps<{id: string}>> = (props) => {
    return (
        <>{props.match.params.id}</>
    )
};

export default DAW;