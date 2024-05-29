<template>
    <div class="legend">
        <div class="item">
            <span class="color research"/>

            <p class="text">R&D</p>
        </div>
        <div class="item">
            <span class="color revenue"/>

            <p class="text">Revenue</p>
        </div>
        <div class="item">
            <span class="color product"/>

            <p class="text">Product</p>
        </div>
        <div class="item">
            <span class="color professional"/>

            <p class="text">Professional Services</p>
        </div>
        <div class="item">
            <span class="color accounting"/>

            <p class="text">Accounting</p>
        </div>
        <div class="item">
            <span class="color cloudop"/>

            <p class="text">It & Cloud Operations</p>
        </div>
        <div class="item">
            <span class="color hr"/>

            <p class="text">HR</p>
        </div>
        <div class="item">
            <span class="color marketing"/>

            <p class="text">Marketing</p>
        </div>
    </div>
</template>

<style scoped>
.legend {
    position: absolute;
    display: flex;
    bottom: 22px;
    padding: 2px;
    left: 50%;
    transform: translateX(-50%);
    /* background: linear-gradient(to right, var(--research-color), var(--revenue-color), var(--product-color), var(--professional-color), var(--accounting-color), var(--cloudop-color), var(--hr-color), var(--marketing-color)); */
    background: linear-gradient(90deg, #7A9CC6 0%, #FDCA40 14.29%, #1D7A8F 28.57%, #4EBF6E 42.86%, #F9937D 57.14%, #817E9F 71.43%, #AFBA32 85.71%, #AA4586 100%);
    border-radius: 10px;
    pointer-events: none;
}

.item {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    text-align: center;
    background: white;
    white-space: nowrap;
    pointer-events: none;
}

.item:first-child {
    border-radius: 8px 0 0 8px;
}
.item:last-child {
    border-radius: 0 8px 8px 0;
}

.item + .item {
    margin-left: -.5px;
}

.text {
    z-index: 2;
    position: relative;
    font-size: 15px;
    font-weight: 400;
    color: var(--text-color);
    font-family: "Inter";
}

.color {
    z-index: 2;
    position: relative;
    border-radius: 4px;
    width: 14px;
    height: 14px;
    margin-right: 6px;
}

.color.research {
    background: var(--research-color);
}

.color.revenue {
    background: var(--revenue-color);
}

.color.product {
    background: var(--product-color);
}

.color.professional {
    background: var(--professional-color);
}

.color.accounting {
    background: var(--accounting-color);
}

.color.cloudop {
    background: var(--cloudop-color);
}

.color.hr {
    background: var(--hr-color);
}

.color.marketing {
    background: var(--marketing-color);
}
</style>