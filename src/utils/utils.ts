export const generateShortUUID = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const formatDate = (date: Date) => {
  const formater = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const [{ value: month }, , { value: day }, , { value: year }] = formater.formatToParts(date)

  return `${year}-${month}-${day}`
};

