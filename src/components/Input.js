// import React, { Component } from 'react'

// class Input extends Component {
//   render() {
//     const { ref, title } = this.props;
//     return (
//       <input type='text' />
//     )
//   }
// }

// export default Input

import React from 'react'

const Input = React.forwardRef((props, ref) => {
  return (
    <input type='text' ref={ref} />
  )
})

export default Input
