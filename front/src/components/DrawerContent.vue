<script setup>
import { onMounted, ref } from 'vue'
import { departementColors } from '../utils/colors'
const props = defineProps(['node'])

let showIntro = ref(false)
</script>

<template>
    <div class="drawer-content" v-if="node">
        <div class="modal-card" :style="`--highlight-color: ${departementColors[node.department]}!important;`">
            <div class="profil">
                <img :src="encodeURIComponent(node?.img)">
            </div>

            <div class="card-body">
                <p class="name">{{  node?.firstname + " " + node?.lastname }}</p>

                <p class="position">{{ node?.position ?? "no position" }}</p>

                <p class="team">
                    <span class="team-color"/>

                    {{ node.department }}
                </p>

                <div class="actions">
                    <div class="action slack">
                        <svg class="action-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15C2 14.4696 2.21071 13.9609 2.58579 13.5858C2.96086 13.2107 3.46957 13 4 13H6V15ZM7 15C7 14.4696 7.21071 13.9609 7.58579 13.5858C7.96086 13.2107 8.46957 13 9 13C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V20C11 20.5304 10.7893 21.0391 10.4142 21.4142C10.0391 21.7893 9.53043 22 9 22C8.46957 22 7.96086 21.7893 7.58579 21.4142C7.21071 21.0391 7 20.5304 7 20V15ZM9 7C8.46957 7 7.96086 6.78929 7.58579 6.41421C7.21071 6.03914 7 5.53043 7 5C7 4.46957 7.21071 3.96086 7.58579 3.58579C7.96086 3.21071 8.46957 3 9 3C9.53043 3 10.0391 3.21071 10.4142 3.58579C10.7893 3.96086 11 4.46957 11 5V7H9ZM9 8C9.53043 8 10.0391 8.21071 10.4142 8.58579C10.7893 8.96086 11 9.46957 11 10C11 10.5304 10.7893 11.0391 10.4142 11.4142C10.0391 11.7893 9.53043 12 9 12H4C3.46957 12 2.96086 11.7893 2.58579 11.4142C2.21071 11.0391 2 10.5304 2 10C2 9.46957 2.21071 8.96086 2.58579 8.58579C2.96086 8.21071 3.46957 8 4 8H9ZM17 10C17 9.46957 17.2107 8.96086 17.5858 8.58579C17.9609 8.21071 18.4696 8 19 8C19.5304 8 20.0391 8.21071 20.4142 8.58579C20.7893 8.96086 21 9.46957 21 10C21 10.5304 20.7893 11.0391 20.4142 11.4142C20.0391 11.7893 19.5304 12 19 12H17V10ZM16 10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12C13.4696 12 12.9609 11.7893 12.5858 11.4142C12.2107 11.0391 12 10.5304 12 10V5C12 4.46957 12.2107 3.96086 12.5858 3.58579C12.9609 3.21071 13.4696 3 14 3C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V10ZM14 18C14.5304 18 15.0391 18.2107 15.4142 18.5858C15.7893 18.9609 16 19.4696 16 20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22C13.4696 22 12.9609 21.7893 12.5858 21.4142C12.2107 21.0391 12 20.5304 12 20V18H14ZM14 17C13.4696 17 12.9609 16.7893 12.5858 16.4142C12.2107 16.0391 12 15.5304 12 15C12 14.4696 12.2107 13.9609 12.5858 13.5858C12.9609 13.2107 13.4696 13 14 13H19C19.5304 13 20.0391 13.2107 20.4142 13.5858C20.7893 13.9609 21 14.4696 21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H14Z"/>
                        </svg>

                        Slack
                    </div>

                    <div class="action mail">
                        <svg class="action-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 7.535V17C22 17.7652 21.7077 18.5015 21.1827 19.0583C20.6578 19.615 19.9399 19.9501 19.176 19.995L19 20H5C4.23479 20 3.49849 19.7077 2.94174 19.1827C2.38499 18.6578 2.04989 17.9399 2.005 17.176L2 17V7.535L11.445 13.832L11.561 13.898C11.6977 13.9648 11.8478 13.9995 12 13.9995C12.1522 13.9995 12.3023 13.9648 12.439 13.898L12.555 13.832L22 7.535Z"/>
                            <path d="M19 4C20.08 4 21.027 4.57 21.555 5.427L12 11.797L2.445 5.427C2.69573 5.01977 3.04021 4.6784 3.44971 4.43138C3.8592 4.18436 4.32183 4.03886 4.799 4.007L5 4H19Z"/>
                        </svg>

                        Mail
                    </div>

                    <div class="action phone">
                        <svg class="action-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2475 16.11L16.9275 14.43C17.1538 14.2065 17.44 14.0536 17.7516 13.9897C18.0631 13.9257 18.3865 13.9537 18.6825 14.07L20.73 14.8875C21.0291 15.0089 21.2856 15.2161 21.4671 15.4831C21.6486 15.75 21.747 16.0647 21.75 16.3875V20.1375C21.7482 20.3571 21.7021 20.574 21.6143 20.7753C21.5265 20.9766 21.3989 21.158 21.2391 21.3087C21.0793 21.4593 20.8907 21.5761 20.6847 21.6519C20.4786 21.7278 20.2593 21.7611 20.04 21.75C5.69248 20.8575 2.79748 8.7075 2.24998 4.0575C2.22456 3.82915 2.24778 3.59801 2.31811 3.37928C2.38844 3.16055 2.50429 2.95919 2.65803 2.78845C2.81177 2.61771 2.99992 2.48145 3.2101 2.38865C3.42028 2.29584 3.64772 2.24859 3.87748 2.25H7.49998C7.82324 2.25096 8.13881 2.3486 8.40612 2.53037C8.67344 2.71214 8.88025 2.96973 8.99998 3.27L9.81748 5.3175C9.93767 5.6123 9.96833 5.93598 9.90564 6.24811C9.84295 6.56024 9.68968 6.84697 9.46498 7.0725L7.78498 8.7525C7.78498 8.7525 8.75248 15.3 15.2475 16.11Z"/>
                        </svg>

                        06 XX XX XX XX
                    </div>
                </div>

                <p class="tags">{{ node?.tags ?? "No tags" }}</p>

                <p class="start-date">{{ node?.startDate ?? "1 year at Intersec" }}</p>
            </div>
        </div>

        <div class="button-wrapper">
            <button @click="() => showIntro = !showIntro" class="hide-show-btn">
                {{ showIntro ? 'Hide' : 'Show' }} intro pdf
                
                <svg v-if="!showIntro" class="arrow down" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00015 8.825C6.20015 8.825 6.40015 8.725 6.50015 8.625L9.80015 5.325C10.1001 5.025 10.1001 4.525 9.80015 4.225C9.50015 3.925 9.00015 3.925 8.70015 4.225L6.00015 6.925L3.30015 4.225C3.00015 3.925 2.50015 3.925 2.20015 4.225C1.90015 4.525 1.90015 5.025 2.20015 5.325L5.40015 8.525C5.60015 8.725 5.80015 8.825 6.00015 8.825Z"/>
                </svg>
                
                <svg v-else class="arrow up" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.0001 4C5.8001 4 5.6001 4.1 5.5001 4.2L2.2001 7.5C1.9001 7.8 1.9001 8.3 2.2001 8.6C2.5001 8.9 3.0001 8.9 3.3001 8.6L6.0001 5.9L8.7001 8.6C9.0001 8.9 9.5001 8.9 9.8001 8.6C10.1001 8.3 10.1001 7.8 9.8001 7.5L6.6001 4.3C6.4001 4.1 6.2001 4 6.0001 4Z"/>
                </svg>
            </button>
        </div>

        <div class="intro" v-if="showIntro && node.welcomeSheetUrl">
            <img class="intro-img" :src="node.welcomeSheetUrl ?? ''">
        </div>
    </div>
</template>

<style scoped>
    .button-wrapper {
        display: block;
        width: 100%;
        text-align: center;
    }

    .hide-show-btn {
        display: inline-block;
        background: white;
        border-radius: var(--border-radius);
        border: solid var(--border-color) var(--border-width);
        padding: 8px 24px;
        line-height: 1;
        font-size: 18px;
        font-weight: 700;
    }

    .drawer-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        width: 100%;
        max-width: 800px;
        border-radius: 20px 0 0 20px;   
    }

    .modal-card {
        position: relative;
        display: flex;
        align-items: center;
        gap: 31px;
        width: 100%;
        height: 300px;
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        border: solid var(--border-color) var(--border-width);
    }

    .profil {
        width: 300px;
        height: 100%;
        border-radius: 100%;
    }

    .profil img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-body {
        display: flex;
        align-items: center;
        justify-content: start;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
    }

    .name {
        font-size: 35px;
        font-weight: 700;
        color: var(--text-color);
    }

    .position {
        color: var(--subtext-color);
        font-weight: 300;
        font-size: 24px;
    }

    .team {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 24px;
    }

    .team-color {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 4px;
        background: var(--highlight-color);
    }

    .tags {
        font-weight: 700;
        font-size: 18px;
        font-weight: 300;
    }

    .arrow {
        width: 13px;
    }

    .actions {
        display: flex;
        gap: 15px;
        margin-bottom: 24px;
    }

    .action {
        line-height: 1;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        border-radius: var(--border-radius);
        color: white;
        font-size: 18px;
        font-weight: 700;
    }

    .action.slack {
        background: #602166;
    }

    .action.mail {
        background: #5370BA;
    }

    .action.phone {
        background: #37BF3D;
    }

    .action-icon {
        margin-left: 4px;
        width: 20px;
        fill: white;
    }

    .intro {
        display: flex;
        align-items: start;
        width: 80%;
        height: 70vh;
        overflow: hidden;
        margin: 0 auto;
    }

    .intro-img {
        width: 100%;
        border-radius: var(--border-radius);
        overflow: hidden;
        object-fit: contain;
        object-position: center;
    }
</style>