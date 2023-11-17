const downloadJsonFile = (dataArray) => {
    // Convert the array to JSON string
    const jsonContent = JSON.stringify(dataArray, null, 2);

    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute and file name
    link.download = "data.json";

    // Create a URL for the Blob and set it as the link's href
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  export default downloadJsonFile;