import UpdateProductFormExtraListItem from "./listItem";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";

export default function UpdateProductFormComponentsPanelExtraPanel() {
  const currentCurrency = useUpdateProductFormStore(
    (state) => state.priceInputValue.currency
  );
  const productExtras = useUpdateProductFormStore(
    (state) => state.productExtras
  );
  console.log(productExtras);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                İşlem
              </th>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                Standart
              </th>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                +Ücret ({currentCurrency})
              </th>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                -Ücret ({currentCurrency})
              </th>

              <th scope="col" className="border-r w-[50%] px-6  py-3">
                Ekstra
              </th>
            </tr>
          </thead>
          <tbody>
            {productExtras.map((extra, index) => {
              return (
                <UpdateProductFormExtraListItem data={extra} key={index} />
              );
            })}
            {[...Array(10 - productExtras.length)].map((e, index) => {
              return (
                <UpdateProductFormExtraListItem
                  data={{
                    tempId: index,
                    isStandard: false,
                    price: "",
                    description: "",
                  }}
                  key={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
