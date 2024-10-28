import { getAllData } from "@/services/serviceOperations";

export default async function handler(req, res) {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "GET") {
    try {
      // fabric datasıyla birlikte category datası da gelsin, ama yalnızca id ve name fieldları lazım olduğu için onlar gelsin.
      // bu sayede daha sonra fabric category'nin name'ine ihtiyacımız olduğu zaman mesela, tekrar name'i almak için istek atmak zorunda kalmayacağız.
      const data = await getAllData("fabric", {
        include: { fabricCategory: { select: { id: true, name: true } } },
      });
      return res.status(200).json({
        success: true,
        fabrics: data,
        message: "kartela listesi başarıyla getirildi.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(500).json({ error: "Yanlış İstek" });
  }
}
