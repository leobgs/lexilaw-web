import { notify } from 'hooks/useToas'

export const copyToClipboard = ({ text, title }) => {
  const textarea = document.createElement('textarea')

  textarea.value = text
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)

  notify(title ?? 'Copy text berhasil!')
}
