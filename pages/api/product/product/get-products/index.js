import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const data = await getAllData("product", {
        include: {
          productType: {
            select: { id: true, name: true },
          },
          images: { take: 1 }, // yalnızca 1 resim çek
        },
      });

      return res.status(200).json({
        success: true,
        products: data,
        message: "Ürün listesi başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
