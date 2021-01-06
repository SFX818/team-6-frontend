import React from 'react'

const Loading = ({loading, text}) => {
    return (
        <div className='input-field'>
        <button className='waves-effect waves-light btn' disabled={loading}>
            { loading && (
                <div className='progress'>
                    <span className='indeterminate'></span>
                </div>
            )}
            <span>{text}</span>
        </button>
    </div>
    )
}

export default Loading