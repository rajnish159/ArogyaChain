const express = require("express");
const axios = require("axios");
const pinataSDK = require("@pinata/sdk");

const app = express();
const port = 3000;

app.use(express.json());

app.post("http://localhost:3000/", async (req, res) => {
  // Initialize Pinata client (update with your Pinata credentials)
  const pinata = pinataSDK(
    "bfecf01f90426dbf5d6d",
    "905cf7bd7955c4fc2adae7338a4a6cc9a377074b4873c17b61516ab165904028"
  );

  try {
    // Replace with the actual IPFS CID of the uploaded text (from Pinata)
    const ipfsCid = "QmUhJAoY6KZxjwPSFPjRRCpArarugscocb2Th67uPnbk5k";

    // Retrieve the text content from Pinata using the CID
    const { IpfsHash } = await pinata.pinByHash(ipfsCid);

    // Send the text content to RapidAPI for analysis
    const analysisResponse = await axios.post(
      "https://text-analysis12.p.rapidapi.com/text-mining/api/v1.1",
      {
        fileContent: IpfsHash,
        language: "english",
        // Additional analysis parameters
      },
      {
        headers: {
            "X-RapidAPI-Key": "70cb240052msh45763baf7f22e55p119bdcjsn081f2b0db686",
            "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
        },
      }
    );

    res.json(analysisResponse.data);
  } catch (error) {
    console.error("Error analyzing text: ", error);
    res.status(500).json({ error: "Analysis error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
