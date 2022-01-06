import React, {useRef, useEffect} from 'react'
import {IoCloseCircleSharp} from 'react-icons/io5'

function ModalComponent({children, component, openModal, setOpenModal, title}) {
    return (
      <div className='component-wrapper'>
        {openModal && (
        <div className="modal-wrapper" >
          <div className="modal" >
            <div className="modal__header">
              <h2>{title}</h2>
              <div className="close-icon" onClick={() => setOpenModal(false)}>
                <IoCloseCircleSharp />
              </div>
            </div>
            {component}
          </div>
        </div>)
        }
        {children}
      </div>
    )
}

export default ModalComponent
