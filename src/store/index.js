import React from 'react'
import globalHook from 'use-global-hook'
import * as actions from './actions'

// middleware

const initialState = {
  prices: {},
}

const useGlobal = globalHook(React, initialState, actions)

export default useGlobal
