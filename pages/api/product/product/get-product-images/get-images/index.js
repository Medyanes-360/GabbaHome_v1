import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const images = await prisma["product"].findUnique({
        where: { id },
        select: {
          images: true,
        },
      });

      return res.status(200).json({
        success: true,
        images: images.images,
        message: "Resimler başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
