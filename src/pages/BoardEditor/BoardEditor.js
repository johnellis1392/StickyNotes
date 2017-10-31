import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
// import { FormattedMessage } from "react-intl"

import { fetchBoard } from "store/actions"
import styles from "./BoardEditor.scss"



export class BoardEditor extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    selectedBoard: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      notes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          content: PropTypes.string,
        })
      )
    }),

    err: PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
    }),


    // Redux
    fetchBoard: PropTypes.func.isRequired,


    // Router
    history: PropTypes.shape({
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,

    // Url Pattern-Matching
    match: PropTypes.shape({
      isExact: PropTypes.bool.isRequired,
      params: PropTypes.shape({
        boardId: PropTypes.string.isRequired,
      }).isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }


  componentWillMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return this.props.history.goBack()
    this.props.fetchBoard(boardId)
  }


  componentWillReceiveProps({ /* selectedBoard, */ err }) {
    if (err) {
      // TODO: Handle Error
    }
  }



  render() {
    const { selectedBoard } = this.props
    if (!selectedBoard) return null

    const props = {
      className: styles.container,
    }

    return (
      <div {...props}>
        <div>{selectedBoard.name}</div>
        <div>{selectedBoard.description}</div>
      </div>
    )
  }
}



const mapStateToProps = (state, props) => {
  const selectedBoard = state.boards.selectedBoard
  return {
    ...props,
    selectedBoard,
  }
}


const mapDispatchToProps = (dispatch /*, props */ ) => {
  return bindActionCreators({
    fetchBoard,
  }, dispatch)
}


export const BoardEditorContainer = connect(mapStateToProps, mapDispatchToProps)(BoardEditor)

export default withRouter(BoardEditorContainer)
