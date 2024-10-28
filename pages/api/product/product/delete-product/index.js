import { deleteDataByAny } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const data = await deleteDataByAny("product", { id: id });
      console.log(data);
      return res
        .status(200)
        .json({ success: true, message: "Ürün başarıyla silindi." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
