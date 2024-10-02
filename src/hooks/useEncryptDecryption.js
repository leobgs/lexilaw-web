export async function encryptAESGCM(plaintext, key) {
  const enc = new TextEncoder()
  const keyBuffer = enc.encode(key).slice(0, 32)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )
  const nonce = crypto.getRandomValues(new Uint8Array(12))

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
  const keyBuffer = new TextEncoder().encode(key).slice(0, 32)

  const combined = Uint8Array.from(atob(encodedCiphertext), (c) =>
    c.charCodeAt(0)
  )

  const nonce = combined.slice(0, 12)
  const ciphertext = combined.slice(12)

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
