export async function encryptAESGCM(key, plaintext) {
  const enc = new TextEncoder()
  const keyBuffer = enc.encode(key).slice(0, 32)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )
  const nonce = crypto.getRandomValues(new Uint8Array(32))

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    cryptoKey,
    enc.encode(plaintext)
  )

  const combined = new Uint8Array(nonce.length + ciphertext.byteLength)
  combined.set(nonce)
  combined.set(new Uint8Array(ciphertext), nonce.length)
  return btoa(String.fromCharCode(...combined))
}

export async function decryptAESGCM(encodedCiphertext, key) {
  const dec = new TextDecoder()
  const keyBuffer = new TextEncoder().encode(key).slice(0, 32) // AES-256 needs 32-byte key

  // Decode base64 encoded ciphertext
  const combined = Uint8Array.from(atob(encodedCiphertext), (c) =>
    c.charCodeAt(0)
  )

  // Extract nonce and ciphertext
  const nonce = combined.slice(0, 12)
  const ciphertext = combined.slice(12)

  // Generate a CryptoKey from the key buffer
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )

  // Decrypt the ciphertext
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: nonce },
    cryptoKey,
    ciphertext
  )

  // Return decoded plaintext
  return dec.decode(plaintextBuffer)
}
