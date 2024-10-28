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

      const { id, ...colorToUpdate } = data;

      const color = await updateDataByAny(
        "color",
        { id },
        { ...colorToUpdate, updatedAt: new Date() }
      );

      return res.status(200).json({
        success: true,
        message: "Renk güncelleme işlemi başarılı",
        color: color,
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
