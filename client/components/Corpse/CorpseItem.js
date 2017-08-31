'use strict'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Column } from '../Grid/Grid'
import Corpse from './Corpse'

const CorpseItem = (props) => {
  const { corpse } = props
  const image = `https://s3.amazonaws.com/exquisitecorpse-s3-001/corpse-${corpse.id}.jpeg`
  return (
    <Column xs='12' md='6' lg='3'>
      <div key={corpse.id} className='col-space'>
        <Corpse>
          <div className='corpse-header'>
            <h4>{corpse.title}</h4>
          </div>
          <div className='image-container'>
            <img src={image} className='corpse-image' />
            <div className='corpse-overlay' />
          </div>
        </Corpse>
      </div>
    </Column>
  )
}

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(CorpseItem)
