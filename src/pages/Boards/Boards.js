import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"

import { FormattedMessage } from "react-intl"
import { Button } from "react-bootstrap"

// import { Button, Form } from "react-bootstrap"
// import { FormattedMessage } from "react-intl"
import { PATH } from "common/const"
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


    // Actions
    fetchBoards: PropTypes.func.isRequired,


    // Router Options
    history: PropTypes.shape({
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }


  static defaultProps = {
    boards: [],
  }



  componentWillMount() {
    this.props.fetchBoards()
  }


  _onBoardClick = (id, e) => {
    e.preventDefault()
    this.props.history.push(PATH.BOARD_EDIT(id))
  }


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        <table className={styles.boardTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Num Notes</th>
              <th/>
            </tr>
          </thead>

          <tbody>
            {_.map(this.props.boards, ({ id, name, notes }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{notes.length}</td>
                <td><Button onClick={_.partial(this._onBoardClick, id)}><FormattedMessage id="boards.edit" /></Button></td>
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


export const BoardsContainer = connect(mapStateToProps, mapDispatchToProps)(Boards)

export default withRouter(BoardsContainer)
