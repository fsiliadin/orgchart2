<script setup>
import DrawerContent from './DrawerContent.vue'
import Drawer from './Drawer.vue'
import { onMounted, ref } from 'vue';
import { OrgChart } from 'd3-org-chart';
import alexImage from "../assets/images/alex.png"
import IntroExampleImage from '../assets/images/intro-example.png'
import mockData from '../utils/mock.json'
import Legend from './Legend.vue';
import { departementColors } from '../utils/colors'

// orgChart options
const nodeButtonWidth = 60
const nodeWidth = 430
const nodeHeight = 160
const childrenMargin = 150
const compactMarginBetween = 30
const compactMarginPair = 50

let selectedNode = ref(null)
let searchValue = ref('')
let searchOptions = ref([])
let searchInput = ref(null)
let chart;
let pauseSearch = ref(false)
let listElement = ref(null)

let usersData = []
let isMock = true

const apiUrl = 'https://localhost:2024'

async function getData() {
    await fetch(apiUrl + "/parsePeople").then(async (response) => {
        const people = await response.json()
    
        usersData = people
    })
    .catch(() => {
        usersData = mockData
        isMock = true
    })

    initChart()
}

 function initChart() {
    chart = new OrgChart()
    .onNodeClick((node) => onNodeClick(node))
    .container('.d-chart')
    .data(usersData)
    .nodeButtonWidth(() => nodeButtonWidth)
    .nodeWidth(() => nodeWidth)
    .nodeHeight(() => nodeHeight)
    .childrenMargin(() => childrenMargin)
    .compactMarginBetween(() => compactMarginBetween)
    .compactMarginPair(() => compactMarginPair)
    .buttonContent(({node, state}) => {
        return `
            <div class="pill-button">
                <p class="pill-button-text"> ${ node.data._directSubordinatesPaging } </p>

                <svg class="pill-button-icon ${node.children ? 'down' : 'up'}" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00015 8.825C6.20015 8.825 6.40015 8.725 6.50015 8.625L9.80015 5.325C10.1001 5.025 10.1001 4.525 9.80015 4.225C9.50015 3.925 9.00015 3.925 8.70015 4.225L6.00015 6.925L3.30015 4.225C3.00015 3.925 2.50015 3.925 2.20015 4.225C1.90015 4.525 1.90015 5.025 2.20015 5.325L5.40015 8.525C5.60015 8.725 5.80015 8.825 6.00015 8.825Z"/>
                </svg>
            </div>
        `
    })
    .nodeContent(function (d, i, arr, state) {
        const depColor = departementColors[d.data.department]
    if (d.data.type && d.data.type === "equipe") {
        return `
        <div class="card team" style="--highlight-color: ${depColor};" data-id="${d.data.id}">
            <div class="card-name"> ${ d.data.firstname } ${d.data.lastname}</div>
        </div>
        `
    }
    else return `
    <div class="card" style="--highlight-color: ${depColor};" data-id="${d.data.id}">
        <div class="card-background">
            <img src=" ${ isMock ? alexImage : encodeURIComponent(d.data.img) }"/>
        </div>

        <div class="card-content">
            <div class="card-img">
                <img src=" ${ isMock ? alexImage : encodeURIComponent(d.data.img) }"/>
            </div>
                
            <div class="card-body">
                <div class="card-name"> ${ d.data.firstname } ${d.data.lastname}</div>
                <div class="card-position"> ${ d.data.position } </div>
                <div class="card-infos">
                    <svg class="card-infos-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 9.08333V13.6667M10 18.25C8.91659 18.25 7.8438 18.0366 6.84286 17.622C5.84193 17.2074 4.93245 16.5997 4.16637 15.8336C3.40029 15.0675 2.7926 14.1581 2.37799 13.1571C1.96339 12.1562 1.75 11.0834 1.75 10C1.75 8.91659 1.96339 7.8438 2.37799 6.84286C2.7926 5.84193 3.40029 4.93245 4.16637 4.16637C4.93245 3.40029 5.84193 2.7926 6.84286 2.37799C7.8438 1.96339 8.91659 1.75 10 1.75C12.188 1.75 14.2865 2.61919 15.8336 4.16637C17.3808 5.71354 18.25 7.81196 18.25 10C18.25 12.188 17.3808 14.2865 15.8336 15.8336C14.2865 17.3808 12.188 18.25 10 18.25ZM10.0458 6.33333V6.425H9.95417V6.33333H10.0458Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div> 
        </div>
    </div>
    `;
    })
    .render();

    chart.fit()

    function onNodeClick(node) {
        if (!selectedNode.value || selectedNode.value.id != node.data.id) {
            return selectedNode.value = node.data
        } else {
            unSelectNode()
        }
      }
 }

function formatSelectedRectangle(employee) {
    const nodes = Array.from(document.querySelectorAll('.node'))
    const map = new Map()

    nodes.forEach(item => {
        const rect = item.querySelector('.node-rect')
        const id = item.querySelector('.card').dataset.id
        map.set(id, rect)
    })
    
    const rectToUpdate = map.get(employee.id)
    rectToUpdate.setAttribute("rx", 15)
    rectToUpdate.style.stroke = departementColors[employee.department] ?? "#DE5252"
}

function onSearchType(e) {
    pauseSearch.value = false
    if (e) {
        searchValue.value = e.target?.value
    }
  if (searchValue.value.length === 0) return searchOptions.value = []
  let searchRegex = new RegExp(searchValue.value, 'i')
  const matchingUsers = usersData.filter((user) => searchRegex.test(user.firstname) || searchRegex.test(user.lastname))
  if (matchingUsers.length === 0) {
        return searchOptions.value = []
    } else {
        searchOptions.value = matchingUsers.map((user) => {
            let item = user
            item.focus = false
            return item
        })
        searchOptions.value[0].focus = true
    }
}

function focusFirstOption() {
    const firstOption = Array.from(document.querySelectorAll('.option'))[0]
    firstOption.focus()
}

function unSelectNode() {
    selectedNode.value = null
}

function onOptionTap(option) {
    chart.clearHighlighting()
    chart.setHighlighted(option.id).render()
    clearSearch()

    if (option.type === "equipe") {
        setTimeout(() => {
            highlightChildren(option.id)
            formatSelectedRectangle(option)
        }, 300)
    } else {
        formatSelectedRectangle(option)
    }
}

function clearSearch() {
    searchValue.value = ""
    searchOptions.value = []
}

function highlightChildren(parentId) {
    const child = usersData.find((item) => item["n+1"] === parentId)
    if (child) {
        const sub = usersData.find((item) => item["n+1"] === child.id)
        if (sub) {
            chart.setExpanded(sub.id)
            chart.setCentered(child.id).render()
        } else {
            chart.setExpanded(child.id).render()
        }
        return
    }
    return
}

function focusOptionByIndex(index) {
    searchOptions.value.forEach((item, itemIndex) => {
        if (itemIndex !== index) {
            item.focus = false
        } else if(item.focus !== true) {
            item.focus = true
        }
    })
    updateOptionListScrollOnFocus(index)
}

function unfocusOptionByIndex(index) {
    searchOptions.value.forEach((option) => option.focus = false)
}

function updateOptionListScrollOnFocus(index) {
    //WIP
    const offset = 100
    const margin = 100
    const listHeight = listElement.value.offsetHeight
    const scroll = listElement.value.scrollTop

    const insideHeight = offset * (index + 1)
    if(insideHeight + margin < listHeight) return

    if (scroll > 0 && insideHeight + margin < listHeight) {
        return listElement.value.scrollTop = 0
    }

    const delta = insideHeight - listHeight
    return listElement.value.scrollTop += delta + margin
}

function onKeyDown(evt) {
    const currentIndexFocus = searchOptions.value.findIndex((option) => option.focus === true)
    switch(evt.key) {
        case 'Escape':
            pauseSearch.value = true
            searchOptions.value = []
            break;
        case 'ArrowDown':
            if (currentIndexFocus + 1 < searchOptions.value.length) {
                focusOptionByIndex(currentIndexFocus + 1);
            } else {
                focusOptionByIndex(0)
            }
            break;
        case 'ArrowUp':
            if (currentIndexFocus - 1 >= 0) {
                focusOptionByIndex(currentIndexFocus - 1);
            } else {
                focusOptionByIndex(searchOptions.value.length -1)
            }
            break;
        case 'Enter':
                if (!searchOptions.value.length) return
                onOptionTap(searchOptions.value[currentIndexFocus])
            break;
        default:
            searchInput.value.focus()
    }
}

function onInputClick() {
    pauseSearch.value = false
    onSearchType()
}

function focusSearchInput() {
    searchInput.value.focus()
}

function searchClickOut(e) {
    const target = e.target
    if (searchValue.value.length && pauseSearch.value === false) {
        if (!target.closest('.input')) {
            pauseSearch.value = true
            searchOptions.value = []
        }
    }

    // if(!target.closest('.search').length) {
    //     console.log('test')
    // }        
}

onMounted(() => {
    getData()
    document.addEventListener('keydown', onKeyDown)

    document.addEventListener('click', (e) => searchClickOut(e))

    focusSearchInput()
})
</script>

<template>
    <div class="main">
        <div class="overlay">
            <div class="search" :class="{active: searchValue.length && pauseSearch === false }">
                <div class="search-input">
                    <div class="search-close" v-if="searchOptions.length" @click="clearSearch">
                        <svg class="search-close-icon" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 13.8293L18.0708 20.9C18.446 21.2752 18.9549 21.486 19.4855 21.486C20.0161 21.486 20.5249 21.2752 20.9001 20.9C21.2753 20.5248 21.4861 20.0159 21.4861 19.4853C21.4861 18.9547 21.2753 18.4459 20.9001 18.0707L13.8268 11L20.8988 3.92933C21.0845 3.74356 21.2318 3.52302 21.3322 3.28033C21.4327 3.03763 21.4844 2.77753 21.4843 2.51486C21.4842 2.2522 21.4324 1.99211 21.3319 1.74947C21.2313 1.50682 21.0839 1.28636 20.8981 1.10067C20.7123 0.914978 20.4918 0.767698 20.2491 0.667238C20.0064 0.566777 19.7463 0.515102 19.4837 0.515164C19.221 0.515226 18.9609 0.567023 18.7183 0.667598C18.4756 0.768173 18.2551 0.915557 18.0695 1.10133L11.0001 8.172L3.92946 1.10133C3.74505 0.910228 3.52444 0.757762 3.28048 0.65283C3.03652 0.547899 2.77411 0.492603 2.50855 0.490171C2.24299 0.487739 1.97961 0.538219 1.73377 0.638665C1.48793 0.739111 1.26456 0.887511 1.07669 1.07521C0.888814 1.2629 0.740203 1.48614 0.639526 1.73188C0.538848 1.97762 0.48812 2.24096 0.490302 2.50652C0.492483 2.77208 0.547531 3.03454 0.652232 3.2786C0.756933 3.52265 0.909192 3.74342 1.10012 3.928L8.17346 11L1.10146 18.072C0.910526 18.2566 0.758267 18.4773 0.653566 18.7214C0.548864 18.9655 0.493817 19.2279 0.491635 19.4935C0.489454 19.759 0.540181 20.0224 0.640859 20.2681C0.741537 20.5139 0.890148 20.7371 1.07802 20.9248C1.26589 21.1125 1.48927 21.2609 1.73511 21.3613C1.98094 21.4618 2.24433 21.5123 2.50988 21.5098C2.77544 21.5074 3.03785 21.4521 3.28181 21.3472C3.52577 21.2422 3.74639 21.0898 3.93079 20.8987L11.0001 13.8293Z"/>
                        </svg>
                    </div>

                    <svg class="icon" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.4167 20.6667H21.9683L21.455 20.1717C23.3138 18.0157 24.3354 15.2633 24.3333 12.4167C24.3333 10.0598 23.6344 7.75581 22.325 5.79612C21.0156 3.83644 19.1545 2.30905 16.977 1.4071C14.7995 0.505158 12.4035 0.269168 10.0918 0.728975C7.78024 1.18878 5.65689 2.32373 3.99032 3.99031C2.32374 5.65689 1.18879 7.78023 0.728981 10.0918C0.269174 12.4034 0.505163 14.7995 1.40711 16.977C2.30905 19.1545 3.83644 21.0156 5.79613 22.325C7.75581 23.6344 10.0598 24.3333 12.4167 24.3333C15.3683 24.3333 18.0817 23.2517 20.1717 21.455L20.6667 21.9683V23.4167L29.8333 32.565L32.565 29.8333L23.4167 20.6667ZM12.4167 20.6667C7.85167 20.6667 4.16667 16.9817 4.16667 12.4167C4.16667 7.85167 7.85167 4.16667 12.4167 4.16667C16.9817 4.16667 20.6667 7.85167 20.6667 12.4167C20.6667 16.9817 16.9817 20.6667 12.4167 20.6667Z"/>
                    </svg>

                    <input ref="searchInput" class="input" type="search" :value="searchValue" placeholder="Search" name="" id="" @input="onSearchType" @click="onInputClick">
                </div>

                <div ref="listElement" class="option-list">
                    <div class="option-list-wrapper">
                        <div
                            v-for="(option, index) in searchOptions"
                            @click="() => onOptionTap(option)"
                            @mouseover="() => focusOptionByIndex(index)"
                            @mouseleave="() => unfocusOptionByIndex(index)"
                            class="option"
                            :class="{ focus: option.focus }"
                            :tabindex="index"
                        >
                            <div class="option-image">
                                <p  v-if="option.type === 'equipe'">Team</p>
                                <img v-else :src="isMock ? alexImage : option.img">
                            </div>

                            <p class="option-name"> {{ `${option.firstname} ${option.lastname}` }} </p>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer class="drawer" :open="selectedNode != null" @close="() => unSelectNode()">
                <DrawerContent :node="selectedNode" />
            </Drawer>

            <Legend />
        </div>
        <div class="d-chart"></div>
    </div>
</template>

<style>
rect {
    border-radius: 20px!important;
}
.main {
    width: 100%;
    height: 100%;
}

.svg-chart-container {
    height: 100vh!important;
}

.node-button-div {
    transform: translateY(-10px);
    border-radius: var(--border-radius);
}

.node-button-foreign-object {
    overflow: visible;
    transform: translateX(-10px);
}

.pill-button {
    display: flex;
    gap: 3px;
    padding: 10px 15px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: rgba(240, 240, 240, 1);
    border: solid 1px rgba(215, 215, 215, 1)!important;
}

.pill-button-text {
    font-size: 18px;
    font-weight: 700;
}

.pill-button-icon {
    width: 15px;
    height: 15px;
    transform-origin: center center;
}

.pill-button-icon.up {
    transform: rotate(180deg);
}

.card {
    display: flex;
    align-items: center;
    --highlight-color: var(--primary);
    position: relative;
    /* width: 420px; */
    height: 156px;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform .2s;
    transform-origin: center center;
    margin-top: 1px;
}

.card-background {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
}

.card-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 30% 40%;
    transform: scale(1.3);
}

.card-content {
    border: solid var(--border-color) var(--border-width);
    border-radius: var(--border-radius);
    position: relative;
    display: flex;
    height: 154px;
    width: 100%;
    align-items: center;
    gap: 12px;
    background-color: rgba(255, 255, 255, .9);
    backdrop-filter: blur(12px);
}

.card:hover {
    /* border-color: var(--primary); */
    transform: scale(1.02);
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
    transform: translate(55%, -55%) rotate(45deg);
    background: var(--highlight-color);
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
    flex: 1;
    padding-top: 35px 20px 40px;
    /* text-align:center; */
}

.card-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 5px;
    font-family: "Montserrat";
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
    transform-origin: center center;
    transform: scale(0);
    transition: transform .4s cubic-bezier(0.1, 1.71, 0.46, 0.74);
}

.card:hover .card-infos {
    transform: scale(1);
}

.card-infos-icon {
    width: 100%;
    height: 100%;
    fill: white;
    stroke: var(--subtext-color);
}

.card.team {
    border: solid var(--border-color) var(--border-width);
    border-radius: var(--border-radius);
    background: white;
}

.card.team .card-name {
    text-align: center;
    text-transform: uppercase;
    color: var(--highlight-color);
    width: 100%;
    padding: 20px;
}

.card.team::after {
    display: none;
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
    height: 60px;
    width: 500px;
    max-width: var(--search-max-width);
  }

  .search.active .search-input {
    width: 100%;
    height: 92px;
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

  .search-close {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .search-close-icon {
    width: 15px;
    height: 15px;
    fill: black;
  }

  .search-input .input:focus {
    outline: none;
    border: solid var(--primary) var(--border-width);
    box-shadow: var(--active-shadow);
  }

  .search-input .input::placeholder {
    color: var(--placeholder-color);
    font-weight: 700;
    font-size: 28px;
  }

  .search-input .icon {
    width: 22px;
    height: 22px;
    fill: var(--text-color);
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }

  .search.active .search-input .icon {
    width: 32px;
    height: 32px;
  }

  .option-list {
    flex: 1;
    position: relative;
    width: 100%;
    overflow-y: scroll;
    padding-top: 26px;
  }

  .option-list-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    width: 100%;
    max-width: var(--search-max-width);
    margin: 0 auto;
  }

  .option {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 26px;
    height: 92px;
    background: white;
    border-radius: var(--border-radius);
    border: solid 1px rgba(215, 215, 215, 1);
    transform-origin: center center;
    transition: transform .1s, background-color .2s;
    cursor: pointer;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }

  .option-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 92px;
    overflow: hidden;
  }

  .option-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .option-image p {
    font-size: 24px;
    color: var(--primary);
    font-weight: 700;
  }

  .option-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color);
  }

  .option.focus {
    transform: scale(1.01);
    background: var(--primary);
    box-shadow: 0 0 40px rgba(222, 82, 82, 0.05);
  }

  .option.focus .option-image p {
    color: white;
    font-weight: 700;
  }

  .option.focus .option-name {
    color: white;
  }
</style>