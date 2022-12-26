import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react()
        // VitePWA({
        //     registerType: 'autoUpdate',
        //     devOptions: {
        //         enabled: true
        //     },
        //     workbox: {
        //         globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        //     },
        //     manifest: {
        //         name: 'My Awesome App',
        //         short_name: 'MyApp',
        //         description: 'My Awesome App description',
        //         theme_color: '#ffffff',
        //         icons: [
        //             {
        //                 src: 'favicon.png',
        //                 sizes: '256x256',
        //                 type: 'image/png'
        //             }
        //         ]
        //     }
        // })
    ]
})
