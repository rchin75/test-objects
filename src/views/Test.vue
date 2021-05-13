<template>
    <div class="test-page">
        <h1>Testing a reactive object model</h1>
        <p class="description">
            The purpose of this test is to see if the Composition API's reactive objects will respond to changes in a complex object model.
            Complex meaning that the object model contains several hierarchical levels and arrays.
        </p>

        <div class="buttons">
            <button @click="onNewOrder">New Order</button> |
            <button @click="onAddItem">Add item</button> |
            <button @click="onRemoveItem">Remove item</button> |
            <button @click="onModifyItemPrices">Modify item prices</button> |
            <button @click="onModifySubItemPrices">Modify sub item prices</button> |
            <button @click="onRenameBuyer">Rename the buyer</button>
        </div>

        <div class="order">
            <p>Order name: {{order.name}}</p>
            <p>Ordered by: {{order.buyer}}</p>

            Items:
            <ul>
                <li v-for="item in order.items" :key="item.name">
                    Name: {{ item.name }}, Price: {{item.price}}
                    <ul>
                        <li v-for="subItem in item.subItems" :key="subItem.name">
                            Sub item name: {{subItem.name}}, Price: {{subItem.price}}
                        </li>
                    </ul>
                </li>
            </ul>

        </div>

    </div>
</template>
<script lang="ts">
    import useOrder from "@/model/useOrder";
    import Item from "@/model/item";

    export default {
        name: 'Test',
        setup() {
            let {order, createOrder} = useOrder();
            let items = 0;
            let orders = 1;
            // Some names to choose from.
            const names = ["Roy","Jonny","Klaas","Luke","Richard","Lara","Leia","Jane","Anne"];

            // Create initial new order.
            createOrder("Order " + orders++, "Roy");

            // Gets a random interger number that represents a price.
            function getRandomPrice() : number {
                return Math.floor(Math.random()*10) + 1;
            }

            // Gets a random name from the list of available names.
            function getRandomName() : string {
                return names[Math.floor(Math.random()*names.length)];
            }

            // Creates a new order.
            function onNewOrder() {
                createOrder("Order " + orders++, getRandomName());
            }

            // Adds an item to the order.
            function onAddItem() {
                items++;
                const item = new Item("Item" + items, getRandomPrice());
                order.value?.items.push(item);

                // Try adding a sub item too to make the hierarchy even deeper.
                items++;
                const subItem = new Item("Sub-item" + items, getRandomPrice());
                item.subItems.push(subItem);
            }

            // Removes the last itemfrom the order.
            function onRemoveItem() {
                order.value?.items.pop();
            }

            // Renames the buyer using a function on the buyer object.
            function onRenameBuyer() {
                // Picks a random name until it is different from the currently assigned name.
                const current = order.value?.buyer.name;
                while (order.value?.buyer.name === current) {
                    order.value?.buyer.rename(getRandomName());
                }
            }

            // Modifies all item prices in the list of assigned items.
            function onModifyItemPrices() {
                order.value?.items.forEach(item => {
                    item.price = getRandomPrice();
                })
                // Make the first item 1000:
                let items : Item[]|undefined = order.value?.items;
                if (items && items.length>0) {
                    items[0].price=1000;
                }
            }

            /* Modifies only the sub item prices */
            function onModifySubItemPrices() {
                order.value?.items.forEach(item => {
                    item.subItems.forEach(subItem => {
                        subItem.price = getRandomPrice();
                    });
                })
            }

            return {
                order,
                // The UI should react to all of these interactions with the order object.
                onNewOrder,
                onAddItem,
                onRemoveItem,
                onModifyItemPrices,
                onModifySubItemPrices,
                onRenameBuyer
            };
        }
    }
</script>
<style lang="less">
    .test-page {
        text-align: left;
        padding: 20px;
        width: 900px;
        margin-left: auto;
        margin-right: auto;
    }
    .description {
        text-align: left;
        margin-bottom: 30px;
    }
    .buttons {
        padding: 5px;
    }
    .order {
        background-color: #eeeeee;
        padding: 10px;
    }
</style>