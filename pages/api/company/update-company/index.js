import { updateDataByAny } from "@/services/serviceOperations";

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

      const { id, ...companyToUpdate } = data;

      const company = await updateDataByAny(
        "company",
        { id },
        { ...companyToUpdate, updatedAt: new Date() }
      );

      return res.status(200).json({
        success: true,
        message: "Şirket Verisi güncelleme işlemi başarılı",
        company: company,
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
