const goUrl = 'http://hggg.lovestoblog.com'; // Update with your default domain
let urf = ''; // Variable to hold the long URL
let vrf = ''; // Variable to hold the vrf value

const allowedKeywords = [
  "", // Add allowed keywords here
];

// Function to generate a random short code
async function generateShortCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortCode = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortCode += characters.charAt(randomIndex);
  }

  return shortCode;
}

// Function to display the short URL
function showShortUrl(shortCode) {
  const shortUrlInput = document.getElementById('shortUrlInput');
  const shortUrl = `${goUrl}/${shortCode}`;
  shortUrlInput.value = shortUrl;

  const shortUrlContainer = document.getElementById('shortUrlContainer');
  shortUrlContainer.classList.remove('hidden');

  const errorContainer = document.getElementById('errorContainer');
  errorContainer.classList.add('hidden');
}

// Function to display the redirect URL
function showRedirectUrl(shortCode) {
  const domainSelect = document.getElementById('domainSelect');
  const selectedDomain = domainSelect.value;

  const redirectUrlInput = document.getElementById('redirectUrlInput');
  const redirectUrl = `${selectedDomain}/go.html?uid=${shortCode}&url=${encodeURIComponent(urf)}&vrf=${encodeURIComponent(vrf)}`;
  redirectUrlInput.value = redirectUrl;

  const redirectUrlContainer = document.getElementById('redirectUrlContainer');
  redirectUrlContainer.classList.remove('hidden');

  const errorContainer = document.getElementById('errorContainer');
  errorContainer.classList.add('hidden');
}

// Function to display an error message
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;

  const errorContainer = document.getElementById('errorContainer');
  errorContainer.classList.remove('hidden');

  const shortUrlContainer = document.getElementById('shortUrlContainer');
  shortUrlContainer.classList.add('hidden');

  const redirectUrlContainer = document.getElementById('redirectUrlContainer');
  redirectUrlContainer.classList.add('hidden');
}

// Function to copy the redirect URL to clipboard
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

// Event listener for the form submission
document.getElementById('urlForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const longUrlInput = document.getElementById('longUrlInput');
  const longUrl = longUrlInput.value.trim();

  if (longUrl) {
    // Check if the URL is long enough (at least 15 characters)
    if (longUrl.length >= 15) {
      try {
        urf = longUrl; // Set the long URL in the urf variable
        vrf = 'your_vrf_value'; // Set your desired vrf value here
        const shortCode = await generateShortCode();
        showShortUrl(shortCode);
        showRedirectUrl(shortCode);
      } catch (error) {
        console.error(error);
        showError('Failed to generate the short code');
      }
    } else {
      showError('URL is too short to generate a short code.');
    }
  }
});

// Event listener for the "Copy Redirect URL" button
document.getElementById('copyRedirectUrlButton').addEventListener('click', () => {
  copyToClipboard('redirectUrlInput');
});
