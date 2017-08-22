'use strict'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCorpse} from '../../store/corpses'

const CorpseItem = (props) => {
  const {corpses} = props
  return (
    <div>
      {
        corpses.length && corpses
          .filter(corpse => corpse.complete)
          .map(corpse => {
            // TODO: This should be in CorpseItem component!
          const image = `https://s3.amazonaws.com/exquisitecorpse-s3-001/corpse-${corpse.id}.jpeg`
          return (
            <div key={corpse.id}>
              {corpse.title}
              <img src={image} width="400"/>
            </div>
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