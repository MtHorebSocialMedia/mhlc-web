<template>
    <v-container class="traffic-summary">
        <v-row>
            <v-col class="month-options">
                <v-btn
                    v-for="month in months"
                    :key="month"
                    @click="getAnalyticsForMonth(month)"
                >
                    {{ month }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert>Report for dates <b>{{ startDateDisplay }}</b> to <b>{{ endDateDisplay }}</b>.</v-alert>
            </v-col>
        </v-row>
        <v-row class="daily-traffic-heading">
            <v-col>
                <h3>Daily Traffic</h3>
            </v-col>
        </v-row>
        <v-row class="daily-traffic-totals">
            <v-col>
                <label>Total Daily Traffic:</label>
                {{ totalDailyTraffic }}
            </v-col>
            <v-col>
                <label>Average Daily Traffic:</label>
                {{ avgDailyTraffic }}
            </v-col>
        </v-row>
        <v-row class="daily-traffic-chart">
            <v-col>
                <Line
                    v-if="dailyTrafficChartData && dailyTrafficChartData.datasets && dailyTrafficChartData.datasets.length > 0"
                    :options="chartOptions"
                    :data="dailyTrafficChartData"
                />
            </v-col>
        </v-row>
        <v-row class="feature-summary-heading">
            <v-col>
                <h3>Feature Summary</h3>
            </v-col>
        </v-row>
        <v-row class="feature-summary-chart">
            <v-col>
                <Bar
                    v-if="featureChartData && featureChartData.datasets && featureChartData.datasets.length > 0"
                    :options="chartOptions"
                    :data="featureChartData"
                />
            </v-col>
        </v-row>
        <v-row class="feature-summary-details">
            <v-col>
                <table class="feature-summary">
                    <thead>
                        <tr>
                            <th class="feature">Feature</th>
                            <th class="visits">Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="feature in featureList" :key="feature">
                            <td class="feature">{{ feature.label }}</td>
                            <td class="visits">{{ feature.data }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row class="platform-summary-heading">
            <v-col>
                <h3>Platform Summary</h3>
            </v-col>
        </v-row>
        <v-row class="platform-summary-chart">
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
        <v-row class="platform-summary-details">
            <v-col>
                <table class="platforms-summary">
                    <thead>
                        <tr>
                            <th class="platform">Platform</th>
                            <th class="count">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="platform in platformsList" :key="platform">
                            <td class="platform">{{ platform.label }}</td>
                            <td class="count">{{ platform.data }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-col>
        </v-row>
        <v-row class="daily-cms-traffic-heading">
            <v-col>
                <h3>Daily CMS Traffic</h3>
            </v-col>
        </v-row>
        <v-row class="daily-cms-traffic-totals">
            <v-col>
                <label>Total Daily CMS Traffic:</label>
                {{ totalDailyCmsTraffic }}
            </v-col>
            <v-col>
                <label>Average Daily CMS Traffic:</label>
                {{ avgDailyCmsTraffic }}
            </v-col>
        </v-row>
        <v-row class="daily-cms-traffic-chart">
            <v-col>
                <Line
                    v-if="dailyCmsTrafficChartData && dailyCmsTrafficChartData.datasets && dailyCmsTrafficChartData.datasets.length > 0"
                    :options="chartOptions"
                    :data="dailyCmsTrafficChartData"
                />
            </v-col>
        </v-row>
        <v-row class="unknown-stats">
            <v-col>
                <h3>Uncategorized Traffic</h3>
                <v-list :items="uncategorizedList"></v-list>
                <h3>Unknown Agents</h3>
                <v-list :items="unknownAgentsList"></v-list>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
    import { useAnalyticsStore } from '@/store/analytics';
    import { ref } from 'vue';
    import { Bar, Doughnut, Line } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
        ArcElement,
        PointElement,
        LineElement
    } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement);

    const analyticsStartYear = 2024;
    const analyticsStartMonth = 10;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth()+1;

    const months = ref([]);
    for (let y=analyticsStartYear; y<=currentYear; y++) {
        const startMonth = y === analyticsStartYear ? analyticsStartMonth : 1;
        const endMonth = y === currentYear ? currentMonth : 12;
        for (let m=startMonth; m<=endMonth; m++) {
            months.value.push(`${y}-${m.toString().padStart(2, '0')}`);
        }
    }
    months.value = months.value.reverse();

    const chartOptions = ref({ responsive: true });

    const startDateDisplay = ref('');
    const endDateDisplay = ref('');

    const featureList = ref([]);
    const featureChartData = ref({
        labels: [],
        datasets: []
    });

    const platformsList = ref([]);
    const platformsChartData = ref({
        labels: [],
        datasets: []
    });

    const totalDailyTraffic = ref(0);
    const avgDailyTraffic = ref(0);
    const dailyTrafficChartData = ref({
        labels: [],
        datasets: []
    });

    const totalDailyCmsTraffic = ref(0);
    const avgDailyCmsTraffic = ref(0);
    const dailyCmsTrafficChartData = ref({
        labels: [],
        datasets: []
    });

    const uncategorizedList = ref([]);
    const unknownAgentsList = ref([]);

    const defaultMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
    getAnalyticsForMonth(defaultMonth);

    async function getAnalyticsForMonth(month) {

        startDateDisplay.value = '';
        endDateDisplay.value = '';

        featureList.value = [];
        featureChartData.value = {
            labels: [],
            datasets: []
        };

        platformsList.value = [];
        platformsChartData.value = {
            labels: [],
            datasets: []
        };

        uncategorizedList.value = [];
        unknownAgentsList.value = [];

        totalDailyTraffic.value = 0;
        dailyTrafficChartData.value = {
            labels: [],
            datasets: []
        };

        totalDailyCmsTraffic.value = 0;
        dailyCmsTrafficChartData.value = {
            labels: [],
            datasets: []
        };

        const {
            startDateTime,
            endDateTime,
            categoryData,
            platformsData,
            uncategorized,
            unknownAgents,
            dailyTrafficData,
            dailyCmsTrafficData
        } = await useAnalyticsStore().getEventsData(month);

        startDateDisplay.value = formatDateTime(startDateTime);
        endDateDisplay.value = formatDateTime(endDateTime);

        platformsList.value = platformsData;
        platformsChartData.value = {
            labels: platformsData.map(cd => cd.label),
            datasets: [{
                backgroundColor: platformsData.map(cd => cd.backgroundColor),
                data: platformsData.map(cd => cd.data)
            }]
        };

        featureList.value = categoryData;
        featureChartData.value = {
            labels: categoryData.map(cd => cd.label),
            datasets: [{ label: 'Visits', data: categoryData.map(cd => cd.data) }]
        };

        uncategorizedList.value = uncategorized;
        unknownAgentsList.value = unknownAgents;

        totalDailyTraffic.value = dailyTrafficData.reduce((sum, td) => sum+td.data, 0);
        avgDailyTraffic.value = Math.round(totalDailyTraffic.value / dailyTrafficData.length);
        dailyTrafficChartData.value = {
            labels: dailyTrafficData.map(td => td.label),
            datasets: [{ label: 'Visits', data: dailyTrafficData.map(td => td.data) }]
        };

        totalDailyCmsTraffic.value = dailyCmsTrafficData.reduce((sum, td) => sum+td.data, 0);
        avgDailyCmsTraffic.value = Math.round(totalDailyCmsTraffic.value / dailyCmsTrafficData.length);
        dailyCmsTrafficChartData.value = {
            labels: dailyCmsTrafficData.map(td => td.label),
            datasets: [{ label: 'CMS API Calls', data: dailyCmsTrafficData.map(td => td.data) }]
        };
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

</script>

<style>
    .traffic-summary table.feature-summary { margin-left: auto; margin-right: auto; border-collapse: collapse; border: 1px solid #666; width: 50%; }
    .traffic-summary table.feature-summary tr { border-bottom: 1px solid #999; }
    .traffic-summary table.feature-summary th { padding: 10px; background: #ccc; }
    .traffic-summary table.feature-summary td { padding: 10px; }
    .traffic-summary table.feature-summary th.feature { text-align: left; }
    .traffic-summary table.feature-summary th.visits { text-align: right; }
    .traffic-summary table.feature-summary td.feature { text-align: left; }
    .traffic-summary table.feature-summary td.visits { text-align: right; }

    .traffic-summary table.platforms-summary { margin-left: auto; margin-right: auto; border-collapse: collapse; border: 1px solid #666; width: 50%; }
    .traffic-summary table.platforms-summary tr { border-bottom: 1px solid #999; }
    .traffic-summary table.platforms-summary th { padding: 10px; background: #ccc; }
    .traffic-summary table.platforms-summary td { padding: 10px; }
    .traffic-summary table.platforms-summary th.platform { text-align: left; }
    .traffic-summary table.platforms-summary th.count { text-align: right; }
    .traffic-summary table.platforms-summary td.platform { text-align: left; }
    .traffic-summary table.platforms-summary td.count { text-align: right; }

    .traffic-summary .month-options { text-align: center; }
    .traffic-summary .month-options button { margin-left: 5px; margin-right: 5px; }

    .traffic-summary .doughnut-wrapper { display: block; width: 50%; margin-left: auto; margin-right: auto; }

    .traffic-summary label { font-weight: bold; }
</style>