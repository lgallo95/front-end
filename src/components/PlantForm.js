import React from 'react'

function PlantForm(props) {
  const {
    values,
    submit,
    change,
  } = props


  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    const { name, value } = evt.target
    change(name, value)
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='form-plant submit'>
        <h2>Add a Plant</h2>
        <div className='form-plant inputs'>
        <h4>General information</h4>
        <label>Plant Nickname
          <input
            value={values.nickname}
            onChange={onChange}
            name='nickname'
            type='text'
          />
        </label>
        <label>Plant Species
          <input
            value={values.species}
            onChange={onChange}
            name='species'
            type='text'
          />
        </label>
        <label>Plant Watering Frequency
          <input
            value={values.h2oFrequency}
            onChange={onChange}
            name='h2oFrequency'
            type='text'
          />
        </label>
        <label>Plant Image URL
          <input
            value={values.imageURL}
            onChange={onChange}
            name='imageURL'
            type='text'
          />
        </label>
        <button>add</button>
      </div>
    </div>
      </form>
  )
}

export default PlantForm;