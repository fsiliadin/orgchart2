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
}

</script>

<template>
    <div class="main">
        <div class="overlay">
            <div class="search">
                <input class="search-input" type="search" placeholder="Cible à stalker ..." name="" id="" @input="onSearchType">

                <div class="search-options">
                    <div class="option" v-for="(option, index) in searchOptions" @click="() => onOptionTap(option)">
                        <p> {{ option.name }} </p>
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
    top: 00px;
    left: 50%;
    width: 100%;
    max-width: 500px;
    pointer-events: all;
    background: white;
    box-shadow: 3px 3px 12px rgba(0, 0, 0, .3);
    border-radius: 4px;
    transform: translateX(-50%);
  }
</style>