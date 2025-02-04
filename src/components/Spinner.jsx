import React from 'react'
import {Loader } from 'lucide-react'
import {motion} from 'motion/react'
import './Spinner.css'

const Spinner = () => {

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="spinner_ctn"
    >
      <Loader className='spinner' />
    </motion.div>
  )
}

export default Spinner