import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const collection = await prisma["collection"].findUnique({
        where: {
          id: id,
        },
        include: {
          // koleksiyonu çekerken koleksiyon tiplerini ve ürünlerini de çek.
          collectionType: {
            select: { id: true, name: true },
          },
          products: {
            // ürünleri çekerken ürün tipini ve resimleri de çek.
            include: {
              productType: {
                select: { id: true, name: true },
              },
              images: { take: 1 }, // ürünlerin resimlerinin yalnızca 1 tanesini çek.
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        collection: collection,
        message: "Koleksiyon başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
