export default function getDomainFromURL(inputUrl) {
  // Parse the URL
  const parsedUrl = new URL(inputUrl)
  
  // Extract the hostname from the parsed URL
  let hostname = parsedUrl.hostname

  // If the hostname starts with 'www.', remove it
  if (hostname.startsWith('www.')) {
    hostname = hostname.slice(4)
  }

  return hostname.split('.').slice(0,-1).join('.') // removes extension
}