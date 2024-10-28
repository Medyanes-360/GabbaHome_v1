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

      const {
        userId,
        password,
        email,
        role,
        phoneNumber,
        id,
        ...employeeToUpdate
      } = data;

      console.log(employeeToUpdate);

      const employee = await prisma["employee"].update({
        where: {
          id,
        },
        data: {
          ...employeeToUpdate,
          updatedAt: new Date(),
          user: {
            update: {
              where: {
                id: userId,
              },
              data: {
                role,
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
        message: "Çalışan güncelleme işlemi başarılı",
        employee: employee,
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
