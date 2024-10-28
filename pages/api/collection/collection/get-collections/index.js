import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const data = await getAllData("collection", {
        include: { collectionType: { select: { id: true, name: true } } },
      });
      return res.status(200).json({
        success: true,
        collections: data,
        message: "Koleksiyon listesi başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
