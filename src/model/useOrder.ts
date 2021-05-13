import VueCompositionApi, {reactive, computed} from '@vue/composition-api';
import Vue from "vue";
import Order from "@/model/order";
import Person from "@/model/person";

// This is needed to use reactive (and other composition API items) on the root level, otherwise we get an error.
Vue.use(VueCompositionApi);

/**
 * State interface. The state represents the state of the object model, which is reactive.
 */
interface State {
    order: Order|null
}

// Here we make a root level state object (singleton).
const state : State = reactive({
    order: null
});

export default function useOrder() {
    // Creates a new order and assigns it to the state.
    // In practice you may want to load an existing order asynchronously from a backend database,
    // but since this is just a test we just create a new one.
    function createOrder(name: string, personName: string) {
        state.order = new Order(name, new Person(personName));
    }

    // A getter for the current order.
    const order = computed(() => state.order);

    return {
        order,
        createOrder
    };
}