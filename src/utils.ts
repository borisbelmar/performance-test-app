import { HTML_NODES } from "./types";

function factorialize(num: number): number {
  if (num < 0) 
    return -1;
  else if (num == 0) 
    return 1;
  else {
    return (num * factorialize(num - 1))
  }
}

function getRandomInt(max = 100000000) {
  return Math.floor(Math.random() * max);
}

const calculations = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a - b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => a / b
]

function simpleCalculation() {
  return calculations[getRandomInt(calculations.length)](getRandomInt(), getRandomInt() + 1)
}

const factorializeInitialInput = 1000

let factorializeInput = factorializeInitialInput

let stressTestStartTime = 0
let tickRenderInterval = 0
let calculationTestInterval = 0
let requestTestInterval = 0
let animationTestInterval = 0


const btnStart = document.getElementById(HTML_NODES.START_BTN) as HTMLButtonElement
const btnStop = document.getElementById(HTML_NODES.STOP_BTN) as HTMLButtonElement
const statusText = document.getElementById(HTML_NODES.STATUS_TEXT) as HTMLParagraphElement
const cbTickRender = document.getElementById(HTML_NODES.CB_TICK_RENDER) as HTMLInputElement
const cbRequestTest = document.getElementById(HTML_NODES.CB_REQUEST_TEST) as HTMLInputElement
const cbAnimationTest = document.getElementById(HTML_NODES.CB_ANIMATION_TEST) as HTMLInputElement
const animationContainer = document.getElementById(HTML_NODES.ANIMATION_TEST_CONTAINER) as HTMLDivElement

const tickRenderIntervalHandler = () => {
  const now = performance.now()
  const timeElapsed = now - stressTestStartTime
  statusText.innerText = `Stress test running for ${timeElapsed.toFixed(2)}ms`
}

const calculationTestIntervalHandler = () => {
  factorialize(factorializeInput)
  simpleCalculation()
  factorializeInput += 10
}

const requestTestIntervalHandler = () => {
  fetch('https://6319f5228e51a64d2bf1a828.mockapi.io/users')
}

const gradientColorsFrom = [
  'from-purple-400',
  'from-indigo-400',
  'from-red-400',
  'from-teal-400',
]

const gradientColorsTo = [
  'to-green-600',
  'to-blue-600',
  'to-yellow-600',
  'to-pink-600',
]

const textSizes = [
  'text-xs',
  'text-2xl',
  'text-4xl',
]

let selectedGradientColorFrom = gradientColorsFrom[0]
let selectedGradientColorTo = gradientColorsTo[0]
let selectedTextSize = textSizes[0]

const animationTestIntervalHandler = () => {
  statusText.classList.remove(selectedGradientColorFrom, selectedGradientColorTo, selectedTextSize)
  selectedGradientColorFrom = gradientColorsFrom[getRandomInt(gradientColorsFrom.length)]
  selectedGradientColorTo = gradientColorsTo[getRandomInt(gradientColorsTo.length)]
  selectedTextSize = textSizes[getRandomInt(textSizes.length)]
  statusText.classList.add(selectedGradientColorFrom, selectedGradientColorTo, selectedTextSize)
}

export function startStressTest(): void {
  btnStart.disabled = true
  stressTestStartTime = performance.now()

  if (cbTickRender.checked) {
    tickRenderInterval = window.setInterval(tickRenderIntervalHandler, 1)
  } else {
    statusText.innerText = 'Stress test running...'
  }

  calculationTestInterval = setInterval(calculationTestIntervalHandler, 10) as unknown as number

  if (cbRequestTest.checked) {
    requestTestInterval = setInterval(requestTestIntervalHandler, 500) as unknown as number
  }

  if (cbAnimationTest.checked) {
    animationContainer.classList.remove('hidden')
    statusText.classList.add(
      'text-transparent',
      'bg-clip-text',
      'bg-gradient-to-r'
    )
    animationTestInterval = setInterval(animationTestIntervalHandler, 500) as unknown as number
  }

  btnStop.disabled = false

  cbRequestTest.disabled = true
  cbTickRender.disabled = true
}

export function stopStressTest (): void {
  btnStop.disabled = true
  clearInterval(calculationTestInterval)
  clearInterval(requestTestInterval)
  clearInterval(tickRenderInterval)
  clearInterval(animationTestInterval)

  if (cbAnimationTest.checked) {
    animationContainer.classList.add('hidden')
    statusText.classList.remove(
      'text-transparent',
      'bg-clip-text', 
      'bg-gradient-to-r',
      ...gradientColorsFrom,
      ...gradientColorsTo,
      ...textSizes
    )
  }

  const endTime = performance.now()
  const timeElapsed = endTime - stressTestStartTime
  statusText.innerText = `Stress test completed in ${timeElapsed.toFixed(2)}ms`
  btnStart.disabled = false

  factorializeInput = factorializeInitialInput

  cbRequestTest.disabled = false
  cbTickRender.disabled = false
}