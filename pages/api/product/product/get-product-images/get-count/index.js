import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const count = await prisma["product"].findUnique({
        where: { id },
        select: {
          _count: {
            select: { images: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        count: count._count.images,
        message: "Resim sayısı başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
