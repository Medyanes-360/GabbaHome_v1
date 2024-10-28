import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { phoneNumber, password, role, email, ...employeeToSave } = data;

      // 1. kullanıcıyı kaydet:
      const savedUser = await prisma.create({
        data: {
          phoneNumber,
          email,
          password,
          role,
          Employee: {
            create: { ...employeeToSave },
          },
        },
        include: {
          Employee: {
            include: { user: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Çalışan ekleme işlemi başarılı",
        employee: savedUser.Employee,
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
