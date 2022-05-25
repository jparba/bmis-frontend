<template>
  <div>
    <v-data-table :headers="headers" :items="filterDesserts" :items-per-page="5" class="elevation-1">
      <template v-for="(col, index) in filters" v-slot:[`header.${index}`]="{ header }">
        {{ header.text }}
        <v-menu :key="index" offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon small :color="filters[header.value].length ? 'red' : ''">
                mdi-filter-variant
              </v-icon>
            </v-btn>
          </template>
          <div style="background-color: white; width: 280px">
            <v-list>
              <v-list-item>
                <div v-if="filters.hasOwnProperty(header.value)">
                  <v-autocomplete multiple dense auto-select-first clearable chips small-chips color="light-blue lighten-3" :items="columnValueList(header.value)" append-icon="mdi-filter" v-model="filters[header.value]" :label="
                  filters[header.value] ? `filter_by: ${header.text}` : ''
                " hide-details>
                    <template v-slot:selection="{ item, index }">
                      <v-chip small class="caption" v-if="index < 5">
                        <span>
                          {{ item }}
                        </span>
                      </v-chip>
                      <span v-if="index === 5" class="grey--text caption">
                        (+{{ filters[header.value].length - 5 }} others)
                      </span>
                    </template>
                  </v-autocomplete>
                </div>
              </v-list-item>
            </v-list>
          </div>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import { component as Viewer } from "v-viewer"
  export default {
    components: {
      Viewer
    },
    data() {
      return {
        filters: { name: [], calories: [], fat: [], carbs: [], protein: [], iron: [] },
        headers: [
          {
            text: "Dessert (100g serving)",
            align: "start",
            sortable: false,
            value: "name"
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" }
        ],
        desserts: [
          {
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%"
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%"
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%"
          },
          {
            name: "Eclair Dark",
            calories: 269,
            fat: 19.0,
            carbs: 29,
            protein: 7.0,
            iron: "9%"
          },
          {
            name: "Eclair Light",
            calories: 190,
            fat: 9.0,
            carbs: 19,
            protein: 2.0,
            iron: "3%"
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%"
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%"
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%"
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%"
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%"
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%"
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%"
          }
        ]
      };
    },
    computed: {
      filterDesserts() {
        return this.desserts.filter((d) => {
          return Object.keys(this.filters).every((f) => {
            return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
          });
        });
      }
    },
    methods: {
      columnValueList(val) {
        return this.desserts.map((d) => d[val]);
      }
    }
  }
</script>