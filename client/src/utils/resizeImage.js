export default function resizeImage(blob, maxWidth, maxHeight, callback) {
  const img = new Image();
  img.onload = function() {
    let width = img.width;
    let height = img.height;

    // Calculate new dimensions while maintaining aspect ratio
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    // Create a temporary canvas to draw the resized image
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Draw the image onto the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    // Convert the canvas back to a Blob
    canvas.toBlob(function(resizedBlob) {
      // Execute the callback with the resized Blob
      callback(resizedBlob);
    }, blob.type);
  };

  // Load the Blob as an image
  const reader = new FileReader();
  reader.onload = function(event) {
    img.src = event.target.result;
  };
  reader.readAsDataURL(blob);
}

// // Example usage
// const originalBlob = /* Your original Blob */;
// const maxWidth = 500;
// const maxHeight = 500;

// resizeImage(originalBlob, maxWidth, maxHeight, function(resizedBlob) {
//   // Now you can use the resized Blob as needed
//   console.log("Resized Blob:", resizedBlob);
// });
