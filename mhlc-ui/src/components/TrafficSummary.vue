<template>
    <v-container>
        <v-row>
            <v-col>
                <v-alert>Report for dates <b>{{ startDate }}</b> to <b>{{ endDate }}</b>.</v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Feature Summary</h3>
            </v-col>
        </v-row>
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
                <table class="traffic-summary">
                    <thead>
                        <tr>
                            <th class="feature">Feature</th>
                            <th class="visits">Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categoryData">
                            <td class="feature">{{ category.label }}</td>
                            <td class="visits">{{ category.data }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Platform Summary</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="doughnut-wrapper">
                    <Doughnut
                        v-if="platformsChartData && platformsChartData.datasets && platformsChartData.datasets.length > 0"
                        :options="chartOptions"
                        :data="platformsChartData"
                    />
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <table class="platforms-summary">
                    <thead>
                        <tr>
                            <th class="platform">Platform</th>
                            <th class="count">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="platform in platformsData">
                            <td class="platform">{{ platform.label }}</td>
                            <td class="count">{{ platform.data }}</td>
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
    import { Bar, Doughnut } from 'vue-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

    const chartData = ref({
        labels: [],
        datasets: []
    });
    const chartOptions = ref({ responsive: true });

    const categoryData = ref([]);

    const startDate = ref('');
    const endDate = ref('');

    const platformsData = ref([]);
    const platformsChartData = ref({
        labels: [],
        datasets: []
    });

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
                            name: path.replace('/content/', '').replaceAll('-', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase()),
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

    const platforms = [{
        name: 'Android',
        color: 'green',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('android')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'iPhone/iPad',
        color: 'blue',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('iphone') || agent.toLowerCase().includes('ipad')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Mac',
        color: 'purple',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('macintosh')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Windows',
        color: 'red',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('windows nt')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Chromebook',
        color: 'yellow',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('cros')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }, {
        name: 'Linux',
        color: 'orange',
        analyze: (agent, platform) => {
            if (agent.toLowerCase().includes('x11; linux x86_64')) {
                platform.count++;
                return true;
            }
        },
        count: 0
    }];

    async function getEventsData() {
        const events = await getEvents();
        startDate.value = formatDateTime(events[0].dateTime);
        endDate.value = formatDateTime(events[events.length-1].dateTime);
        const uncategorized = [];
        const unknownAgents = [];
        events.forEach(event => {
            const [path] = event.resource.split('?');
            const categoryFound = categories.some(category => category.analyze(path, category));
            if (!categoryFound) {
                uncategorized.push(path);
            }
            const platformFound = platforms.some(platform => platform.analyze(event.agent, platform));
            if (!platformFound) {
                unknownAgents.push(event.agent);
            }
        });
        platformsData.value = platforms.map(({ name, color, count }) => ({
            label: name,
            backgroundColor: color,
            data: count
        })).sort((a, b) => {
            return b.data - a.data;
        });
        platformsChartData.value = {
            labels: platformsData.value.map(cd => cd.label),
            datasets: [{
                backgroundColor: platformsData.value.map(cd => cd.backgroundColor),
                data: platformsData.value.map(cd => cd.data)
            }]
        };
        console.log('unknownAgents: ', unknownAgents);
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

        categoryData.value = categoryData.value.sort((a, b) => {
            return b.data - a.data;
        });
        chartData.value = {
            labels: categoryData.value.map(cd => cd.label),
            datasets: [{ label: 'Visits', data: categoryData.value.map(cd => cd.data) }]
        };
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

</script>

<style>
    table.traffic-summary { margin-left: auto; margin-right: auto; border-collapse: collapse; border: 1px solid #666; width: 50%; }
    table.traffic-summary tr { border-bottom: 1px solid #999; }
    table.traffic-summary th { padding: 10px; background: #ccc; }
    table.traffic-summary td { padding: 10px; }
    table.traffic-summary th.feature { text-align: left; }
    table.traffic-summary th.visits { text-align: right; }
    table.traffic-summary td.feature { text-align: left; }
    table.traffic-summary td.visits { text-align: right; }

    table.platforms-summary { margin-left: auto; margin-right: auto; border-collapse: collapse; border: 1px solid #666; width: 50%; }
    table.platforms-summary tr { border-bottom: 1px solid #999; }
    table.platforms-summary th { padding: 10px; background: #ccc; }
    table.platforms-summary td { padding: 10px; }
    table.platforms-summary th.platform { text-align: left; }
    table.platforms-summary th.count { text-align: right; }
    table.platforms-summary td.platform { text-align: left; }
    table.platforms-summary td.count { text-align: right; }

    .doughnut-wrapper { display: block; width: 50%; margin-left: auto; margin-right: auto; }
</style>