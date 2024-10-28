import { getDataByUnique } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const category = await getDataByUnique("fabricCategory", { id: id });

      return res.status(200).json({
        success: true,
        message: "Kartela Kategorisi başarıyla getirildi.",
        fabricCategory: category,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
