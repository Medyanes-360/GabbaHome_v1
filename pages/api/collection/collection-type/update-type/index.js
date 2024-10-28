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

      const { id, ...collectionTypeToUpdate } = data;

      const collectionType = await updateDataByAny(
        "collectionType",
        { id },
        { ...collectionTypeToUpdate, updatedAt: new Date() }
      );

      return res.status(200).json({
        success: true,
        message: "Koleksiyon Tipi güncelleme işlemi başarılı",
        collectionType: collectionType,
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
