'use strict'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import CorpseItem from './CorpseItem'

const CorpseList = (props) => {
  const {corpses} = props
  return (
    <div className='gallery center'>
      {
        corpses.length && corpses
          .filter(corpse => corpse.complete)
          .map(corpse => <CorpseItem key={corpse.id} corpse={corpse} />)
      }
    </div>
  )
}

const mapState = ({corpses}) => ({corpses})
const mapDispatch = null

export default connect(mapState, mapDispatch)(CorpseList)
