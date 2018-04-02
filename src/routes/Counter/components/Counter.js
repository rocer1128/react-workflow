import React from 'react'
import {
  Button
} from 'react-bootstrap'

export const Counter = (props) => (
  <div className='container-fluid' style={{ margin: '0 auto' }} >
    <h2>Counter: {props.counter}</h2>
    <Button bsStyle='primary' onClick={props.increment}>
      Increment
    </Button>
    {' '}
    <Button bsStyle='danger' onClick={props.doubleAsync}>
      Double (Async)
    </Button>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
