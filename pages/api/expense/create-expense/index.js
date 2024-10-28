import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { storeId, ...dataToSave } = data;
      const expense = await prisma["expense"].create({
        data: {
          ...dataToSave,
          store: {
            connect: {
              id: storeId,
            },
          },
        },
        include: {
          store: { select: { id: true, name: true } },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Gider ekleme işlemi başarılı",
        expense: expense,
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
