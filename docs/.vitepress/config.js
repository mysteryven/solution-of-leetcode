import { defineConfig } from 'vitepress'
import path from 'path'
import glob from 'fast-glob'
import fs from 'fs'

export default defineConfig({
    title: '题解',
    description: '力扣题解和每日一题',
    lastUpdated: true,
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/mysteryven/solution-of-leetcode' },
        ],
        sidebar: [
            {
                text: '每日一题（ 2022-10 ）',
                items: generateDailyRouters('2022-10')
            },
            {
                text: '周赛',
                items: []
            }

        ]
    }
})


function generateDailyRouters(suffix) {
    const dir = path.resolve(__dirname, '../daily', suffix)
    const dailySolutions = glob.sync(path.join(dir, '**/*.md'))

    const dailyRouters = dailySolutions.map(filePath => {
        const filename = path.parse(filePath).name
        const text = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        })

        const title = text.trim().split('\n')[0].trim().slice(1)

        return {
            text: title,
            link: path.join('/daily', suffix, filename)
        }
    })

    return dailyRouters
}

