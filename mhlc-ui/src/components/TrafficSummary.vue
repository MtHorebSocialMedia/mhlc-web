<template>
    <v-container class="traffic-summary">
        <v-row>
            <v-col class="month-options">
                <v-btn
                    v-for="month in months"
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
        <v-row>
            <v-col>
                <h3>Feature Summary</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Bar
                    v-if="featureChartData && featureChartData.datasets && featureChartData.datasets.length > 0"
                    :options="chartOptions"
                    :data="featureChartData"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <table class="feature-summary">
                    <thead>
                        <tr>
                            <th class="feature">Feature</th>
                            <th class="visits">Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="feature in featureList">
                            <td class="feature">{{ feature.label }}</td>
                            <td class="visits">{{ feature.data }}</td>
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
                        <tr v-for="platform in platformsList">
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
    import { useAnalyticsStore } from '@/store/analytics';
    import { ref } from 'vue';
    import { Bar, Doughnut } from 'vue-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

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

        const {
            startDateTime,
            endDateTime,
            categoryData,
            platformsData,
            uncategorized,
            unknownAgents
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
</style>