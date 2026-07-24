export default async function handler(req, res) {
  const API_KEY = process.env.NEWSDATA_API_KEY;

  try {
    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in&language=en`
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
