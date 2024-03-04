import { actionType } from 'config/state'

class Reducer {
  _state
  constructor(state, dispatch) {
    this.dispatch = dispatch
    this._state = state
  }

  dispatch(action) {
    this.dispatch(action)
    return this
  }

  then(callback) {
    return this.dispatch({ type: actionType.RESOLVE, callback })
  }
}

export default Reducer
