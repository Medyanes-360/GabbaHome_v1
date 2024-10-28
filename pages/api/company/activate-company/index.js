import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      let company = null;

      // bizim hazır fonksiyonlarımız yetersiz geldiği, prisma transactionunu desteklemediği için
      // default kullanıldı. transaction yapısında eğer aşağıdakilerden herhangi birisi fail olursa tüm işlem iptal edilir
      // ve error fırlatır. yani eğer herhangi bir component eklenmemişse ürünü eklemeyi komple iptal et diyoruz.
      // bkz. https://www.prisma.io/docs/orm/prisma-client/queries/transactions#example

      await prisma.$transaction(
        async (tx) => {
          await tx["company"].updateMany({
            // aktif olan şirketi deaktive et
            where: { isActive: true },
            data: { isActive: false },
          });
          company = await tx["company"].update({
            // verilen şirketi aktifleştir
            where: { id },
            data: { isActive: true },
          });
        },

        {
          // işlemin gerçekleşmesi ne kadar beklensin? sonra cancellansın:
          maxWait: 2000, // default: 2000
          timeout: 5000, // default: 5000
        }
      );

      return res.status(200).json({
        success: true,
        message: "Şirket Aktifleştirildi",
        company: company,
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
