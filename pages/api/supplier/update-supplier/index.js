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

      const { userId, password, email, phoneNumber, id, ...supplierToUpdate } =
        data;

      const supplier = await prisma["supplier"].update({
        where: {
          id,
        },
        data: {
          ...supplierToUpdate,

          updatedAt: new Date(),
          user: {
            update: {
              where: {
                id: userId,
              },
              data: {
                password,
                email,
                phoneNumber,
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Tedarikçi güncelleme işlemi başarılı",
        supplier: supplier,
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
