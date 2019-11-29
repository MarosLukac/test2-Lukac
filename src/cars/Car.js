import React from 'react'

export default function Car(props) {
  const { car, showDetail, editHandler, deleteHandler} = props
  return (
    <li onClick={() => showDetail(car)} 
        className={'list-group-item '}>
          <div className="d-flex flex-row">
            <div className="flex-fill">
              <b>Brand:</b> {car.brand}  <b>Spz:</b> {car.spz}
            </div> 
            <button className="btn btn-primary"
                    onClick={(event) => {
                      event.stopPropagation()
                      editHandler(car)
                    }}>Edit</button>
             <button className="btn btn-secondary"
                    onClick={(event) => {
                      event.stopPropagation()
                      deleteHandler(car)
                    }}>Delete</button>
            
          </div>
    </li>
  )
}


