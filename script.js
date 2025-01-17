const _addActivity = document.getElementById('addActivity')

_addActivity.addEventListener('click', () => {
  addActivityToList('Label', 7, 8)
  recalculateTotal()
})

function addActivityToList(text, days, hours) {
  const container = document.createElement('div')
  container.classList.add('container')
  document.getElementById('list').appendChild(container)

  const total = document.createElement('span')

  const activityLabel = document.createElement('span')
  activityLabel.textContent = text
  activityLabel.classList.add('label', 'editable')
  activityLabel.setAttribute('contenteditable', 'false')
  container.appendChild(activityLabel)

  const colon = document.createElement('span')
  colon.textContent = ' : '
  container.appendChild(colon)

  const activityNumberDays = document.createElement('span')
  activityNumberDays.textContent = days
  activityNumberDays.classList.add('number', 'editable')
  activityNumberDays.setAttribute('contenteditable', 'false')
  container.appendChild(activityNumberDays)

  const d = document.createElement('span')
  d.textContent = 'd '
  container.appendChild(d)

  const multiplied = document.createElement('span')
  multiplied.textContent = ' × '
  container.appendChild(multiplied)

  const activityNumberHours = document.createElement('span')
  activityNumberHours.textContent = hours
  activityNumberHours.classList.add('number', 'editable')
  activityNumberHours.setAttribute('contenteditable', 'false')
  container.appendChild(activityNumberHours)

  const h = document.createElement('span')
  h.textContent = 'h '
  container.appendChild(h)

  container.appendChild(total)
  updateTotal(container)

  const removeContainer = document.createElement('button')
  removeContainer.classList.add('removeActivity')
  removeContainer.textContent = '-'
  removeContainer.addEventListener('click', () => {
    container.remove()
    updateTotal()
  })
  container.appendChild(removeContainer)

  function updateTotal(container) {
    recalculateTotal()

    const days = parseInt(activityNumberDays.textContent) || 0
    const hours = parseInt(activityNumberHours.textContent) || 0
    const totalHours = days * hours
    if (container) {
      container.dataset.num = totalHours
    }
    total.textContent = `which is ${totalHours}h/ per week`
  }

  editable()

  function editable() {
    const editableText = document.querySelectorAll('.editable')
    editableText.forEach((element) => {
      element.addEventListener('click', () => {
        element.setAttribute('contenteditable', 'true')
        element.focus()
      })

      element.addEventListener('blur', () => {
        element.setAttribute('contenteditable', 'false')
        updateTotal(container)
      })

      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          element.blur()
        }
      })
    })
  }
}

function recalculateTotal() {
  let total = 0
  const totalWasteArray = document.querySelectorAll('.container')
  totalWasteArray.forEach((element) => {
    total += parseInt(element.dataset.num) || 0
  })
  document.getElementById('totalWaste').textContent = `${168 - total} hours left in the week`
}

document.addEventListener('DOMContentLoaded', () => {
  recalculateTotal()
})

addActivityToList('Sleeping', 7, 8)
addActivityToList('School/Work', 5, 7)
