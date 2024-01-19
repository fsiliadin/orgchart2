<script setup lang="ts">
import DrawerContent from './DrawerContent.vue'
import Drawer from './Drawer.vue'
import { onMounted, ref } from 'vue';
import { OrgChart } from 'd3-org-chart';
import alexImage from "../assets/images/alex.png"
// import * as d3 from 'd3'

// orgChart options
const nodeWidth = 250
const nodeHeight = 175
const childrenMargin = 40
const compactMarginBetween = 15
const compactMarginPair = 80

let selectedNode = ref< null | NodeData>(null)
let searchValue = ref<string>('')
let searchOptions = ref<any[]>([])

interface NodeData {
    id: any,
    parentId?: any,
    name: string,
    profileUrl: string,
    welcomeSheetUrl?: string, 
    area: "Corporate" | "r&d" | "Marketing" | "Sales"
    tags: string,
    positionName: string,
    startDate?: string,
};

const usersData: NodeData[] = [
    {
        "name": "Alex S",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1,manager,cto",
        "positionName": "Chief Executive Officer ",
        "id": "O-6066",
        "parentId": "",
        // "welcomeSheet": "http://example.com/employee/profile"
    },
    {
        "name": "Davolio Nancy",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1, tag2",
        "positionName": "CTO ",
        "id": "O-6067",
        "parentId": "O-6066",
        // "welcomeSheet": "http://example.com/employee/profile"
    },
    {
        "name": " Leverling Janet",
        "area": "Corporate",
        "profileUrl": alexImage,
        "tags": "Ceo,tag1, tag2",
        "positionName": "CTO ",
        "id": "O-6068",
        "parentId": "O-6066",
        // "welcomeSheet": "http://example.com/employee/profile"
    },
]

/**
 * selectionner quelqu'un 
 * trouver quelqu'un avec la search bar -> animation vers personne avec zoom et déplacement
 * 
 */

 let chart: OrgChart | null;

onMounted(() => {
    chart = new OrgChart()
    .onNodeClick((node) => onNodeClick(node))
    .container('.d-chart')
    .data(usersData)
    .nodeWidth(() => nodeWidth)
    .nodeHeight(() => nodeHeight)
    .childrenMargin(() => childrenMargin)
    .compactMarginBetween(() => compactMarginBetween)
    .compactMarginPair(() => compactMarginPair)
    .nodeContent(function (d: any, i, arr, state) {
    return `
    <div class="card" style="height:${ d.height }px;">
        <div class="card-head" style="height:${ d.height - 32 }px;">
        <img class="card-img" src=" ${ d.data.profileUrl }" style="margin-left:${d.width / 2 - 30}px;" />

        <div class="card-id">${ d.data.id }</div>

        <div class="card-body">
            <div class="card-name"> ${ d.data.name }</div>
            <div class="card-position"> ${ d.data.positionName } </div>
        </div> 

        <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
            <div > Manages:  ${d.data._directSubordinates} 👤</div>  
            <div > Oversees: ${d.data._totalSubordinates} 👤</div>
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
        // myDiagram.scale = 1;
        // myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(key));
      }

    //   window.addEventListener('keydown', (key) => {
    //     if (key.code === "Enter" && searchValue.value != null) {
    //         onSearch
    //     }
    //   })
})


function onSearchType(e: Event) {
  searchValue.value = (e.target as HTMLInputElement)?.value
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
    background: white;
    padding-top:30px;
    margin-left:1px;
    border-radius:2px;
    overflow:visible;
}

.card-head {
    padding-top:0px;
    background-color:white;
    border:1px solid lightgray;
}

.card-img {
    margin-top:-30px;
    border-radius:100px;
    width:60px;
    height:60px;
}

.card-id {
    margin-right:10px;
    margin-top:15px;
    float:right;
}

.card-body {
    padding:20px;
    padding-top:35px;
    text-align:center;
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
    border-radius: 4px;
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
    padding-left: 82px;
    border: solid var(--border-color) var(--border-width);
    border-radius: var(--border-radius);
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