<script setup>
import DrawerContent from './DrawerContent.vue'
import Drawer from './Drawer.vue'
import { onMounted, ref } from 'vue';
import { OrgChart } from 'd3-org-chart';
import alexImage from "../assets/images/alex.png"
import IntroExampleImage from '../assets/images/intro-example.png'
// import * as d3 from 'd3'

// orgChart options
const nodeWidth = 480
const nodeHeight = 175
const childrenMargin = 40
const compactMarginBetween = 15
const compactMarginPair = 80

let selectedNode = ref(null)
let searchValue = ref('')
let searchOptions = ref([])

const usersData = [
    {
        "name": "Alex S",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1,manager,cto",
        "positionName": "Chief Executive Officer ",
        "id": "O-6066",
        "parentId": "",
        "welcomeSheetUrl": IntroExampleImage,
    },
    {
        "name": "Davolio Nancy",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1, tag2",
        "positionName": "CTO ",
        "id": "O-6067",
        "parentId": "O-6066",
        "welcomeSheetUrl": IntroExampleImage,
    },
    {
        "name": " Leverling Janet",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1, tag2",
        "positionName": "CTO ",
        "id": "O-6068",
        "parentId": "O-6066",
        "welcomeSheetUrl": IntroExampleImage,
    },
]

async function getData() {
  const response = await fetch("https://localhost:2024/parsePeople");
  const people = await response.json()
  console.log(people);
}

/**
 * selectionner quelqu'un 
 * trouver quelqu'un avec la search bar -> animation vers personne avec zoom et déplacement
 * 
 */

 let chart;

onMounted(() => {
    getData()
    
    chart = new OrgChart()
    .onNodeClick((node) => onNodeClick(node))
    .container('.d-chart')
    .data(usersData)
    .nodeWidth(() => nodeWidth)
    .nodeHeight(() => nodeHeight)
    .childrenMargin(() => childrenMargin)
    .compactMarginBetween(() => compactMarginBetween)
    .compactMarginPair(() => compactMarginPair)
    .nodeContent(function (d, i, arr, state) {
    return `
    <div class="card">
        <div class="card-img">
            <img src=" ${ d.data.profileUrl }"/>
        </div>     

        <div class="card-body">
            <div class="card-name"> ${ d.data.name }</div>
            <div class="card-position"> ${ d.data.positionName } </div>
            <div class="card-infos">
                <svg class="card-infos-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9.08333V13.6667M10 18.25C8.91659 18.25 7.8438 18.0366 6.84286 17.622C5.84193 17.2074 4.93245 16.5997 4.16637 15.8336C3.40029 15.0675 2.7926 14.1581 2.37799 13.1571C1.96339 12.1562 1.75 11.0834 1.75 10C1.75 8.91659 1.96339 7.8438 2.37799 6.84286C2.7926 5.84193 3.40029 4.93245 4.16637 4.16637C4.93245 3.40029 5.84193 2.7926 6.84286 2.37799C7.8438 1.96339 8.91659 1.75 10 1.75C12.188 1.75 14.2865 2.61919 15.8336 4.16637C17.3808 5.71354 18.25 7.81196 18.25 10C18.25 12.188 17.3808 14.2865 15.8336 15.8336C14.2865 17.3808 12.188 18.25 10 18.25ZM10.0458 6.33333V6.425H9.95417V6.33333H10.0458Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div> 
    </div>
    `;
    })
    .render();

    function onNodeClick(node) {
        console.log(node.data)
        if (!selectedNode.value || selectedNode.value.id != node.data.id) {
            return selectedNode.value = node.data
        } else {
            unSelectNode()
        }
      }
})


function onSearchType(e) {
  searchValue.value = e.target?.value
  if (searchValue.value.length === 0) return searchOptions.value = []
  const matchingUsers = usersData.filter((user) => user.name.includes(searchValue.value))
    searchOptions.value = matchingUsers
}

function onSearch() {
  console.log(searchValue)
// document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.commandHandler.zoomToFit());
}

function unSelectNode() {
    selectedNode.value = null
    console.log('close')
}

function onOptionTap(option) {
    console.log(option)
    chart.setUpToTheRootHighlighted(option.id).render().fit()
    searchOptions.value = []
    searchValue.value = ""
}

</script>

<template>
    <div class="main">
        <div class="overlay">
            <div class="search" :class="{active: searchOptions.length}">
                <div class="search-input">
                    <svg class="icon" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.4167 20.6667H21.9683L21.455 20.1717C23.3138 18.0157 24.3354 15.2633 24.3333 12.4167C24.3333 10.0598 23.6344 7.75581 22.325 5.79612C21.0156 3.83644 19.1545 2.30905 16.977 1.4071C14.7995 0.505158 12.4035 0.269168 10.0918 0.728975C7.78024 1.18878 5.65689 2.32373 3.99032 3.99031C2.32374 5.65689 1.18879 7.78023 0.728981 10.0918C0.269174 12.4034 0.505163 14.7995 1.40711 16.977C2.30905 19.1545 3.83644 21.0156 5.79613 22.325C7.75581 23.6344 10.0598 24.3333 12.4167 24.3333C15.3683 24.3333 18.0817 23.2517 20.1717 21.455L20.6667 21.9683V23.4167L29.8333 32.565L32.565 29.8333L23.4167 20.6667ZM12.4167 20.6667C7.85167 20.6667 4.16667 16.9817 4.16667 12.4167C4.16667 7.85167 7.85167 4.16667 12.4167 4.16667C16.9817 4.16667 20.6667 7.85167 20.6667 12.4167C20.6667 16.9817 16.9817 20.6667 12.4167 20.6667Z"/>
                    </svg>

                    <input class="input" type="search" :value="searchValue" placeholder="Cible à stalker ..." name="" id="" @input="onSearchType">
                </div>

                <div class="option-list">
                    <div class="option" v-for="(option, index) in searchOptions" @click="() => onOptionTap(option)">
                        <div class="option-image">
                            <img :src="option.profileUrl" alt="">
                        </div>
                        <p class="option-name"> {{ option.name }} </p>
                    </div>
                </div>
            </div>

            <Drawer class="drawer" :open="selectedNode != null" @close="() => unSelectNode()">
                <DrawerContent :node="selectedNode" />
            </Drawer>
        </div>
        <div class="d-chart"></div>
    </div>
</template>

<style>
.main {
    width: 100%;
    height: 100%;
}

.card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 420px;
    height: 160px;
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: solid var(--border-color) var(--border-width);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform .2s;
    transform-origin: center center;
}

.card:hover {
    border-color: var(--primary);
    transform: scale(1.01);
}


/* tag or area */
.card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100px;
    transform-origin: center center;
    transform: translate(50%, -50%) rotate(45deg);
    background: var(--primary);
}

.card-img {
    width: 150px;
    height: 100%;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-body {
    padding:20px;
    padding-top:35px;
    /* text-align:center; */
}

.card-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 5px;
}

.card-position {
    font-weight: 300;
    font-size: 18px;
    color: var(--subtext-color);
}

.card-infos {
    position: absolute;
    bottom: 11px;
    right: 21px;
    width: 17px;
}

.card-infos-icon {
    width: 100%;
    height: 100%;
    fill: white;
    stroke: var(--subtext-color);
}

.overlay {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .search {
    position: absolute;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 26px;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    padding: 36px;
    box-shadow: 3px 3px 12px rgba(0, 0, 0, .3);
    transform: translateX(-50%);
    transition: background-color .2s;
  }

  .search.active {
    pointer-events: all;
  }

  .search::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .2s;
    background: rgba(255, 255, 255, 0.60);
    backdrop-filter: blur(25px);
  }

  .search.active::before {
    opacity: 1;
  }

  .search-input {
    pointer-events: all;
    position: relative;
    display: flex;
    align-items: center;
    height: 92px;
    width: 100%;
    max-width: var(--search-max-width);
  }

  .search-input .input {
    width: 100%;
    height: 100%;
    border: 0;
    line-height: 1;
    font-size: 28px;
    padding-left: 82px;
    color: var(--text-color);
    font-weight: 700;
    box-shadow: var(--shadow);
    border: solid var(--border-color) var(--border-width);
    border-radius: var(--border-radius);
  }

  .search-input .input:focus {
    outline: solid 1px var(--primary);
    box-shadow: var(--active-shadow);
  }

  .search-input .input::placeholder {
    color: var(--placeholder-color);
    font-weight: 700;
    font-size: 28px;
  }

  .search-input .icon {
    width: 32px;
    height: 32px;
    fill: var(--text-color);
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }

  .option-list {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    width: 100%;
    max-width: var(--search-max-width);
  }

  .option {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 26px;
    background: white;
    border-radius: var(--border-radius);
    transform-origin: center center;
    transition: transform .1s, background-color .2s;
    cursor: pointer;
  }

  .option-image {
    height: 100%;
    width: 92px;
    overflow: hidden;
  }

  .option-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .option-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
  }

  .option:hover {
    transform: scale(1.01);
    background: var(--primary);
  }

  .option:hover .option-name {
    color: white;
  }
</style>