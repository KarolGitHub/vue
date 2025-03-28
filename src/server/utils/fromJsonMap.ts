import { Item } from "@/server/models/Item";
import { DocumentData } from "firebase/firestore";

const fromJsonMap = (
  itemDoc: DocumentData | undefined,
  idDocument: string,
): Item | undefined => {
  if (itemDoc == null) return undefined;
  const item: Item = {
    id: idDocument,
    name: itemDoc.name ?? "",
    color: itemDoc.color ?? "",
    price: itemDoc.price ?? 0,
    image: itemDoc.image ?? "",
  };
  return item;
};

export default fromJsonMap;
