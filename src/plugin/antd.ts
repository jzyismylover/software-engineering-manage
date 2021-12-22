import type { App } from 'vue';

import {Modal, Table, Menu, Input, Form, Card, Button, Row, Col } from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    // 注册全局常用的组件
    app.use(Form)
        .use(Input)
        .use(Modal)
        .use(Table)
        .use(Menu)
        .use(Card)
        .use(Button)
        .use(Row)
        .use(Col)
}