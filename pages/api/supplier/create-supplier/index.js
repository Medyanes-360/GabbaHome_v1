import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { phoneNumber, password, email, ...supplierToSave } = data;
      let supplier;
      // TRANSACTION: aşağıdaki işlemlerin herhangi birisinde sorun çıakrsa tüm işlemler otomatik iptal edilir.

      await prisma.$transaction(
        async (tx) => {
          // 1. kullanıcıyı kaydet:
          const savedUser = await tx["user"].create({
            data: { phoneNumber, email, password, role: "SUPPLIER" },
          });

          // user'dan gelen bilgilerle employee objesini yarat:
          supplier = await tx["supplier"].create({
            data: { ...supplierToSave, userId: savedUser.id },
          });

          // yaratılan employee objesini user'ı da içine alacak şekilde çek:
          supplier = await tx["supplier"].findUnique({
            where: { id: supplier.id },
            include: { user: true },
          });
        },

        {
          // işlemin gerçekleşmesi ne kadar beklensin? sonra cancellansın:
          maxWait: 5000, // default: 2000
          timeout: 5000, // default: 5000
        }
      );

      return res.status(200).json({
        success: true,
        message: "Tedarikçi ekleme işlemi başarılı",
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
