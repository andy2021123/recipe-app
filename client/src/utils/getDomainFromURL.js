export default function getDomainFromURL(inputUrl) {

  try {
    const parsedUrl = new URL(inputUrl)
    let hostname = parsedUrl.hostname
    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4)
    }

    return hostname.split('.').slice(0,-1).join('.')
  } catch {
    return null
  }
}

// NOTE: IDENTICAL FUNCTION TO FUNCTION USED IN BACKEND