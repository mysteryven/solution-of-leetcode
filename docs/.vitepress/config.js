import { defineConfig } from 'vitepress'


export default defineConfig({
    title: '题解',
    description: '力扣题解和每日一题',
    themeConfig: {
        sidebar: [
            {
                text: '每日一题（ 2022-10 ）',
                items: [
                    { text: '1694. 重新格式化电话号码', link: '/reformat-phone-number' },
                ]
            },
            {
                text: '周赛',
                items: [
                ]
            }

        ]
    }
})
