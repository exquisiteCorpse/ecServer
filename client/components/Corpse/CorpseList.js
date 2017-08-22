'use strict'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCorpse} from '../../store/corpses'

const CorpseItem = (props) => {
  const {corpses} = props
  return (
    <div>
      {
        corpses.map(corpse => {
          return (
            // TODO: This should be CorpseItem component
            <div key={corpse.id}>{corpse.title}</div>
          )
        })
      }
    </div>
  )
}

const mapState = ({corpses}) => ({corpses})
const mapDispatch = (dispatch) => {
  return {
    fetchCorpseItem(id) {
      dispatch(fetchCorpse(id))
    }
  }
}

export default connect(mapState, mapDispatch)(CorpseItem)