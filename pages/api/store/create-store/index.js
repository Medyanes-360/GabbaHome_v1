import { createNewData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const store = await createNewData("store", { ...data });
      console.log(store);
      return res.status(200).json({
        success: true,
        message: "mağaza ekleme işlemi başarılı",
        store: store,
      });
    } catch (error) {
      return res.status(500).json({
        status: error.status,
        error: error.message,
      });
    }
  } else {
    return res.status(500).json({ error: "Yanlış istek." });
  }
};
export default handler;
