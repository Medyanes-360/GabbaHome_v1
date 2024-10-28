import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const data = req.body;
      if (!data.id || !data) {
        throw new Error(
          "Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz."
        );
      }

      const { id, ...collectionToUpdate } = data;

      const collection = await prisma["collection"].update({
        where: { id },
        data: {
          ...collectionToUpdate,

          updatedAt: new Date(),
        },
        include: { collectionType: { select: { id: true, name: true } } },
      });

      console.log(collection);
      return res.status(200).json({
        success: true,
        message: "Koleksiyon güncelleme işlemi başarılı",
        collection: collection,
      });
    } catch (error) {
      console.log(error);
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
