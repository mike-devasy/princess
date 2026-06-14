/** @format */

const onSpinEnd = (event) => {
  if (event.propertyName !== "transform") return

  wheelImage.removeEventListener("transitionend", onSpinEnd)

  currentRotation = nextRotation

  wheelLayout.classList.remove("is-spinning")
  wheelLayout.classList.add("is-finished")

  wheelImage.style.transition = "none"
  wheelImage.style.transform = `rotate(${currentRotation}deg)`

  setTimeout(() => {
    if (targetStage === 1) {
      bonusItems.classList.add("is-bonus-left")
      stage = 1
      isSpinning = false
      return
    }

    if (targetStage === 2) {
      bonusItems.classList.add("is-bonus-right")
      stage = 2
      spinButton.disabled = true
      setTimeout(() => {
        openRegistrationPopup()
        isSpinning = false
      }, POPUP_DELAY)
    }
  }, RESULT_DELAY)
}
