import { HTML_NODES } from './types'
import { startStressTest, stopStressTest } from './utils'

function init() {
  const stressBtn = document.getElementById(HTML_NODES.START_BTN) as HTMLButtonElement
  const stopBtn = document.getElementById(HTML_NODES.STOP_BTN) as HTMLButtonElement

  stressBtn.addEventListener('click', startStressTest)
  stopBtn.addEventListener('click', stopStressTest)
}

init()
