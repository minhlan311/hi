export const LocalStorageEventTarget = new EventTarget()

export const remoteQuestionsList = () => {
  localStorage.removeItem('questionsList')
  const remoteQuestionsListEvent = new Event('remoteQuestionsList')
  LocalStorageEventTarget.dispatchEvent(remoteQuestionsListEvent)
}

export const getQuestionsList = () => {
  const result = localStorage.getItem('questionsList')

  return result ? JSON.parse(result) : null
}

export const setQuestionsListFromLS = (questionsList: string[]) => {
  localStorage.setItem('questionsList', JSON.stringify(questionsList))
}
