<template>
    <v-container>
        <v-row>
            <v-col>
                <Bar
                    v-if="chartData && chartData.datasets && chartData.datasets.length > 0"
                    :options="chartOptions"
                    :data="chartData"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categoryData">
                            <td>{{ category.label }}</td>
                            <td>{{ category.data }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import { getEvents } from '@/utils/auditService';
    import { ref } from 'vue';
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const chartData = ref({
        labels: [],
        datasets: []
    });
    const chartOptions = ref({ responsive: true });

    const categoryData = ref([]);

    getEventsData();

    const categories = [
        {
            name: 'Home',
            analyze: (path, category) => {
                if (['/', '/home'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'News',
            analyze: (path, category) => {
                if (['/news'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'News Entry',
            analyze: (path, category) => {
                if (path.startsWith('/news/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Blogs',
            analyze: (path, category) => {
                if (['/blog-posts'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Blogs Entry',
            analyze: (path, category) => {
                if (path.startsWith('/blog-posts/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Live Streams',
            analyze: (path, category) => {
                if (['/live-streams'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Live Stream Video',
            analyze: (path, category) => {
                if (path.startsWith('/live-streams/')) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Leaders',
            analyze: (path, category) => {
                if (['/leaders'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Contact',
            analyze: (path, category) => {
                if (['/contact'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Newsletter Signup',
            analyze: (path, category) => {
                if (['/newsletter'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Donate',
            analyze: (path, category) => {
                if (['/donate'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Donate Paypal Complete',
            analyze: (path, category) => {
                if (['/donate/paypal-complete'].includes(path)) {
                    category.count++;
                    return true;
                }
            },
            count: 0
        },
        {
            name: 'Content',
            analyze: (path, category) => {
                if (path.startsWith('/content')) {
                    if (!category.subcategories[path]) {
                        category.subcategories[path] = {
                            name: path,
                            count: 0
                        };
                    }
                    category.subcategories[path].count++;
                    return true;
                }
            },
            subcategories: {}
        }
    ];

    async function getEventsData() {
        const events = await getEvents();
        const uncategorized = [];
        events.forEach(event => {
            const [path] = event.resource.split('?');
            const found = categories.some(category => category.analyze(path, category));
            if (!found) {
                uncategorized.push(path);
            }
        });
        categories.forEach((category) => {
            if (category.subcategories) {
                Object.values(category.subcategories).forEach((subCategory) => {
                    if (subCategory.count > 0) {
                        categoryData.value.push({
                            label: subCategory.name,
                            data: subCategory.count
                        });
                    }
                });
            } else {
                if (category.count > 0) {
                    categoryData.value.push({
                        label: category.name,
                        data: category.count
                    });
                }
            }
        });
        chartData.value = {
            labels: categoryData.value.map(cd => cd.label),
            datasets: [{ label: 'Visits', data: categoryData.value.map(cd => cd.data) }]
        };
        console.log(categoryData);
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

</script>

<style>

</style>