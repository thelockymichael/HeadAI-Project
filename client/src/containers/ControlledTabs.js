import React from 'react'
import { useKey } from '../hooks/index'
import ControlledTabsComponent from '../components/ControlledTabsComponent'

const ControlledTabs = () => {
  const keyInput = useKey('skills')

  return <ControlledTabsComponent keyInput={keyInput} />
}

export default ControlledTabs
