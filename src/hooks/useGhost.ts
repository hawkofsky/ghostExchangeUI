import { useContext } from 'react'
import { Context } from '../contexts/GhostProvider'

const useGhost = () => {
  const { ghost } = useContext(Context)
  return ghost
}

export default useGhost
