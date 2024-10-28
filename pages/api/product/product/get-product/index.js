import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const product = await prisma["product"].findUnique({
        where: {
          id: id,
        },
        include: {
          // koleksiyonu çekerken koleksiyon tiplerini ve ürünlerini de çek.
          productType: {
            select: { id: true, name: true },
          },
          measurements: true,
          metals: true,
          fabrics: true,
          colors: true,
          extras: true,
          images: true,
          extras: true,
        },
      });

      return res.status(200).json({
        success: true,
        product: product,
        message: "Ürün başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
