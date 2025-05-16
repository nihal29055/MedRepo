import axios from "axios";

export const summarizeText = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post("http://localhost:5001/summarize", { text });
    res.json(response.data);
  } catch (error) {
    console.error("Error summarizing text:", error);
    res.status(500).json({ message: "Failed to summarize text" });
  }
};