<template>
  <!--省市区的级联选择框-->
  <a-space class="address__city">
    <a-select
      v-model:value="state.provinceName"
      style="width: 120px"
      :options="provinceData.map((pro) => ({ value: pro }))"
    ></a-select>
    <a-select
      v-model:value="state.cityName"
      style="width: 120px"
      :options="cities.map((city) => ({ value: city }))"
    ></a-select>
    <a-select
      v-model:value="state.regionName"
      style="width: 120px"
      :options="regions.map((region) => ({ value: region }))"
    ></a-select>
  </a-space>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import { Space, Select } from 'ant-design-vue'

interface Positon {
  provinceData: string,
  cityData: string,
  regionData: string
}

/**
 * 接受外部 props => 内部实现多层逻辑嵌套
 * props 
 *  @param state - 存储当前选择
 *  @param provinceData - 省数组集合
 *  @param cities - 市数组集合
 *  @param regions - 区数组集合
 */

export default defineComponent({
  name: 'BaseSpace',
  props: {
  },
  components: {
    [Space.name]: Space,
    [Select.name]: Select
  },
  setup(props, { attrs }) {
    // 除了 any 有没有其他类型推断的方法呢？
    const { provinceData, cityData, regionData } = attrs as any;
    const province = provinceData[0];
    const city = cityData[province][0];
    const state = reactive({
      provinceName: province,
      cityName: cityData[province][0],
      regionName: regionData[city][0],
      detailAddress: "",
      userName: "",
      userPhone: "",
    });

    // 市
    const cities = computed(() => {
      return cityData[state.provinceName];
    });
    // 区
    const regions = computed(() => {
      return regionData[state.cityName];
    });

    watch(
      () => state.provinceName,
      (val) => {
        state.cityName = cityData[val][0];
      }
    );

    watch(
      () => state.cityName,
      (val) => {
        state.regionName = regionData[val][0];
      }
    );

    return {
      state,
      provinceData,
      cityData,
      regionData,
      cities,
      regions
    }
  },
})
</script>
