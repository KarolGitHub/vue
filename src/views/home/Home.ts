import { computed, defineComponent, ref } from "vue";
import { notifications, products } from "../../store";
import { Item } from "../../server/models/Item";

export default defineComponent({
  setup() {
    const id = ref("");
    const showModalDetail = ref(false);
    const item = ref<Item | undefined>({});
    const bag = computed<Item[]>(() => {
      console.debug(products.getters.getBag());
      return products.getters.getBag();
    });
    const total = computed(() => bag.value.reduce((a, b) => a + b.price!, 0));
    const deleteItem = (index: number): void => {
      bag.value.splice(index, 1);
    };
    const searchItem = async (): Promise<void> => {
      item.value = await products.actions.searchItem(id.value);
      console.debug("item.value", item.value);
      if (!item.value!.name) {
        const toastLocal = {
          body: "No articles found",
          tittle: "The article does not exist",
          type: "error",
          show: true,
        };
        notifications.actions.presentToast(toastLocal);
        return;
      }
      item.value!.quantity = 1;
      showModalDetail.value = true;
    };
    const onCloseModal = (): void => {
      showModalDetail.value = false;
      id.value = "";
    };
    const addItem = (type: "+" | "-", itemOnChange: Item): Item => {
      const itemLocal = itemOnChange;
      if (type === "+") {
        itemLocal.quantity! += 1;
      } else {
        itemLocal.quantity! -= 1;
      }
      return itemLocal;
    };
    return {
      id,
      searchItem,
      showModalDetail,
      item,
      bag,
      onCloseModal,
      total,
      addItem,
      deleteItem,
    };
  },
});
