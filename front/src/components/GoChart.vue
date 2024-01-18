<script setup lang="ts">
import { onMounted, ref } from 'vue';
import alexImage from "../assets/images/alex.png"
import go, { Diagram, GraphObject } from 'gojs'

let selectedNode = ref< null | GraphObject>(null)
let searchValue = ref<string>('')

onMounted(() => {
  const myDiagram = new go.Diagram("myDiagramDiv",
  {
    "undoManager.isEnabled": true,
    layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 })
  });

// the template we defined earlier
myDiagram.nodeTemplate =
  new go.Node("Horizontal",
    {
      background: "#44CCFF",
      // click: (e, node) => console.log('enter', node.data.name),
      click: (e, node) => {
        zoomOnNode(parseInt(node.data.key, 10))
        selectedNode.value = node
      },
  })
    .add(new go.Picture(
        { margin: 10, width: 50, height: 50, background: "red" })
        .bind("source"))
    .add(new go.TextBlock("Default Text",
        { margin: 12, stroke: "white", font: "bold 16px sans-serif" })
        .bind("text", "name"));

myDiagram.model = new go.TreeModel(
  [
    { key: "1",              name: "Don Meow",   source: alexImage },
    { key: "2", parent: "1", name: "Demeter",    source: alexImage },
    { key: "3", parent: "1", name: "Copricat",   source: alexImage },
    { key: "4", parent: "3", name: "Jellylorum", source: alexImage },
    { key: "5", parent: "3", name: "Alonzo",     source: alexImage },
    { key: "6", parent: "2", name: "Munkustrap", source: alexImage }
  ]);

  // EVENTS
  function zoomOnNode(key: number) {
    myDiagram.scale = 1;
    myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(key));
  }

})

function onSearchType(e: Event) {
  searchValue.value = (e.target as HTMLInputElement)?.value
}

function onSearchSelect() {
  console.log(searchValue)
// document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.commandHandler.zoomToFit());
}

window.addEventListener("keydown", () => {
  onSearchSelect()
})
</script>

<template>
  <div class="main">
    <div class="overlay">
      <div class="search">
        <input type="search" name="" id="" @input="onSearchType">
      </div>

      <div class="drawer" :class="{open: selectedNode != null}">
        <p>{{ selectedNode?.data?.name ?? "placeholder" }}</p>
      </div>
    </div>
    <div id="myDiagramDiv" class="diagram"></div>
  </div>
</template>

<style scoped>
  .diagram {
    width: 100vw;
    height: 100vh;
  }

  .overlay {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .drawer {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    transition: transform .2s;
  }

  .drawer.open {
    transform: translateX(0);
    width: 30vw;
    max-width: 600px;
    padding: 40px;
    border-radius: 10px 0 0 10px;
    background: lightgray;
  }

  .search {
    pointer-events: all;
  }
</style>
