import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const collection = await prisma["collection"].create({
        data: {
          ...data,
        },
        include: { collectionType: { select: { id: true, name: true } } },
      });

      return res.status(200).json({
        success: true,
        message: "Koleksiyon ekleme işlemi başarılı",
        collection: collection,
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
