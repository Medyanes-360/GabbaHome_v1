import { getDataByUnique } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const { isActive } = req.query;
      let company;
      if (id) {
        company = await getDataByUnique("company", {
          id: id,
        });
      } else {
        company = await getDataByUnique("company", {
          isActive: isActive,
        });
      }

      return res.status(200).json({
        success: true,
        company: company,
        message: "Şirket Verisi başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
