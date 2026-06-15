/** @format */

import "./home.scss"

// Form connection=================================
import { initPasswordToggle } from "./password-toggle.js"
import { initFormValidation } from "./form-validation.js"
import { initPhoneMask } from "./phone-select.js"

const initFlashPreview = () => {
  const container = document.querySelector("[data-flash-items]")

  if (!container || container.dataset.flashPreviewInitialized === "true") return

  const items = [
    container.querySelector('[data-flash-item="day"]'),
    container.querySelector('[data-flash-item="night"]'),
  ].filter(Boolean)

  if (items.length < 2) return

  container.dataset.flashPreviewInitialized = "true"

  const activeClass = "is-active"
  const activeDuration = 900
  const idleDuration = 360
  const sequence = [0, null, 1, null]

  let timerId = null
  let sequenceIndex = 0
  let isPaused = false
  const pauseReasons = new Set()

  const clearActive = () => {
    items.forEach((item) => item.classList.remove(activeClass))
  }

  const setActiveItem = (itemIndex) => {
    clearActive()

    if (typeof itemIndex === "number") {
      items[itemIndex]?.classList.add(activeClass)
    }
  }

  const getDelay = (itemIndex) => (typeof itemIndex === "number" ? activeDuration : idleDuration)

  const clearTimer = () => {
    if (timerId === null) return

    window.clearTimeout(timerId)
    timerId = null
  }

  const queueNext = (delay = 0) => {
    if (isPaused || timerId !== null) return

    timerId = window.setTimeout(scheduleNext, delay)
  }

  const scheduleNext = () => {
    timerId = null

    if (isPaused) return

    const itemIndex = sequence[sequenceIndex]
    setActiveItem(itemIndex)
    sequenceIndex = (sequenceIndex + 1) % sequence.length
    queueNext(getDelay(itemIndex))
  }

  const pausePreview = (reason) => {
    pauseReasons.add(reason)

    if (isPaused) return

    isPaused = true
    clearTimer()
    clearActive()
  }

  const resumePreview = (reason) => {
    pauseReasons.delete(reason)

    if (pauseReasons.size > 0 || !isPaused) return

    isPaused = false
    queueNext(idleDuration)
  }

  items.forEach((item) => {
    item.addEventListener("pointerenter", () => pausePreview("pointer"))
    item.addEventListener("pointerleave", () => resumePreview("pointer"))
    item.addEventListener("focusin", () => pausePreview("focus"))
    item.addEventListener("focusout", () => resumePreview("focus"))
  })

  window.addEventListener("beforeunload", clearTimer, { once: true })
  scheduleNext()
}

const initPopupFlow = () => {
  const flow = document.querySelector("[data-popup-flow]")

  if (!flow || flow.dataset.popupFlowInitialized === "true") return

  const bonus = flow.querySelector("[data-popup-bonus]")
  const form = flow.querySelector("[data-popup-form]")
  const bonusButton = flow.querySelector("[data-popup-bonus-button]")

  if (!bonus || !form || !bonusButton) return

  flow.dataset.popupFlowInitialized = "true"

  const setStep = (step) => {
    const isFormStep = step === "form"

    flow.dataset.step = step
    bonus.hidden = isFormStep
    form.hidden = !isFormStep

    if (isFormStep) {
      const firstField = form.querySelector("input:not([type='hidden']), button, a")
      firstField?.focus({ preventScroll: true })
    }
  }

  bonusButton.addEventListener("click", () => setStep("form"))

  document.addEventListener("afterPopupOpen", (event) => {
    if (event.detail?.popup?.targetOpen?.selector === "popup") {
      setStep("bonus")
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initFlashPreview()
  initPopupFlow()
  initPasswordToggle()
  initFormValidation()
  initPhoneMask()
})
