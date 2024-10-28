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
      let {
        id,
        colors,
        metals,
        fabrics,
        extras,
        images,
        measurements,

        ...productToAdd
      } = data;

      // aşağıda ürün güncellendikten sonra diğer componentların eklenmesi / silinmesi ürün id'sine bağlı.
      // bizim hazır fonksiyonlarımız yetersiz geldiği, prisma transactionunu desteklemediği için
      // prisma'nın default fonksiyonları kullanıldı. transaction yapısında eğer aşağıdakilerden herhangi birisi fail olursa tüm işlem iptal edilir
      // ve error fırlatır. yani eğer herhangi bir component eklenmemişse /silinnmemişse ürünü güncellemeyi komple iptal et diyoruz.
      // bkz. https://www.prisma.io/docs/orm/prisma-client/queries/transactions#example

      const product = await prisma["product"].update({
        where: { id: id },
        data: {
          ...productToAdd,

          colors: {
            deleteMany: {},
            ...(colors.length > 0 && { createMany: { data: [...colors] } }),
          },
          images: {
            deleteMany: {},
            ...(images.length > 0 && {
              createMany: {
                data: [
                  ...images.map((elem) => {
                    return {
                      image: elem,
                    };
                  }),
                ],
              },
            }),
          },
          metals: {
            deleteMany: {},
            ...(metals.length > 0 && { createMany: { data: [...metals] } }),
          },
          fabrics: {
            deleteMany: {},
            ...(fabrics.length > 0 && { createMany: { data: [...fabrics] } }),
          },
          measurements: {
            deleteMany: {},
            ...(measurements.length > 0 && {
              createMany: { data: [...measurements] },
            }),
          },
          extras: {
            deleteMany: {},
            ...(extras.length > 0 && {
              createMany: { data: [...extras] },
            }),
          },
        },
        include: {
          productType: {
            select: { id: true, name: true },
          },
          images: { take: 1 }, // yalnızca 1 resim çek
        },
      });

      return res.status(200).json({
        success: true,
        message: "Ürün güncelleme işlemi başarılı",
        product: {
          ...product,
        },
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
