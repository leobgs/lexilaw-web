import { useState } from 'react'

export const useDocumentEncryptor = () => {
  const [encryptedHex, setEncryptedHex] = useState('')
  const [error, setError] = useState(null)

  // Function to convert a file into ArrayBuffer
  const fileToArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('Error reading file'))
      reader.readAsArrayBuffer(file)
    })
  }

  // Function to convert Uint8Array to a Hex string
  const toHexString = (byteArray) => {
    return Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  // Encrypt the file with AES-GCM and return a hex string
  const encryptFile = async (file, password) => {
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12)) // Initialization vector (IV)
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      )

      // Derive an AES-GCM key
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: iv,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      )

      const fileBuffer = await fileToArrayBuffer(file)

      // Encrypt the file content
      const encryptedContent = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        fileBuffer
      )

      // Combine IV and the encrypted content
      const encryptedData = new Uint8Array(
        iv.byteLength + encryptedContent.byteLength
      )
      encryptedData.set(iv) // First 12 bytes are the IV
      encryptedData.set(new Uint8Array(encryptedContent), iv.byteLength) // Append encrypted content

      // Convert the entire encrypted data to a hex string
      const hexString = toHexString(encryptedData)

      setEncryptedHex(hexString)
      setError(null)
      return hexString
    } catch (err) {
      setError('Encryption failed')
      console.error('Encryption error: ', err)
    }
  }

  return { encryptFile, encryptedHex, error }
}
