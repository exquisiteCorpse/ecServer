'use strict'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCorpses} from '../../store/corpses'
import Corpse from './Corpse'

const CorpseList = (props) => {
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
              <div className='col-pad col-lg-3 col-md-4 col-xs-6' key={corpse.id}>
                <Corpse>
                  <div className='corpse-header'>
                    {corpse.title}
                  </div>
                  <div className='image-container'>
                    <img src={image} className='corpse-image img-responsive center-block' />
                    <div className='corpse-overlay' />
                  </div>
                </Corpse>
              </div>
            )
          })
      }
    </div>
  )
}

const mapState = ({corpses}) => ({corpses})
const mapDispatch = null

export default connect(mapState, mapDispatch)(CorpseList)
