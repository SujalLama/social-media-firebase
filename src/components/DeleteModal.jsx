import React from 'react'

function DeleteModal ({title}) {
    return (
        <div className="modal__delete">
            <h4>Are your sure you want to Delete the {title}?</h4>
            <button className='btn btn__primary'>Confirm</button>
        </div>
    )
}

export default DeleteModal
