/**
 * 全局注册常用自定义组件
 */

 import type { App, Component, ComputedOptions, MethodOptions } from 'vue';
 const importIn = import.meta.glob('./*.vue')
 
 export default (app?: App<Element>) => {
   for(const path in importIn) {
     importIn[path]().then((mod: { default: Component<any, any, any, ComputedOptions, MethodOptions>; }) => {
       app?.component(mod.default.name!, mod.default);
     })
   }
 }
 