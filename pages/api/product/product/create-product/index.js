import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      let {
        colors,
        metals,
        fabrics,
        extras,
        images,
        measurements,
        ...productToAdd
      } = data;

      // aşağıda ürün eklendikten sonra diğer componentların eklenmesi ürün id'sine bağlı.
      // bizim hazır fonksiyonlarımız yetersiz geldiği, prisma transactionunu desteklemediği için
      // default kullanıldı. transaction yapısında eğer aşağıdakilerden herhangi birisi fail olursa tüm işlem iptal edilir
      // ve error fırlatır. yani eğer herhangi bir component eklenmemişse ürünü eklemeyi komple iptal et diyoruz.
      // bkz. https://www.prisma.io/docs/orm/prisma-client/queries/transactions#example

      const product = await prisma["product"].create({
        data: {
          ...productToAdd,

          colors: {
            ...(colors.length > 0 && { createMany: { data: [...colors] } }),
          },
          images: {
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
            ...(metals.length > 0 && { createMany: { data: [...metals] } }),
          },
          fabrics: {
            ...(fabrics.length > 0 && { createMany: { data: [...fabrics] } }),
          },
          measurements: {
            ...(measurements.length > 0 && {
              createMany: { data: [...measurements] },
            }),
          },
          extras: {
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
        message: "Ürün ekleme işlemi başarılı",
        product: {
          ...product,
        },
      });
    } catch (error) {
      console.error(error);
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
