import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

// import { Button, Form } from "react-bootstrap"
// import { FormattedMessage } from "react-intl"
import { fetchBoards } from "store/actions"
import styles from "./Boards.scss"
import _ from "underscore"



export class Boards extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        notes: PropTypes.array,
      })
    ),

    fetchBoards: PropTypes.func.isRequired,
  }

  static defaultProps = {
    boards: [],
  }


  componentWillMount() {
    this.props.fetchBoards()
  }


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Num Notes</th>
            </tr>
          </thead>

          <tbody>
            {_.map(this.props.boards, ({ id, name, notes }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{notes.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}



const mapStateToProps = (state, props) => {
  const { boards } = state.boards
  return {
    ...props,
    boards,
  }
}


const mapDispatchToProps = (dispatch /*, props*/ ) => {
  return bindActionCreators({
    fetchBoards,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Boards)
