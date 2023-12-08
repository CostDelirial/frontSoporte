<template>
    <v-card>
       <v-card>
       <v-card-text>
        <v-col>
            <v-container fluid>
              <v-row dense>
            <v-col
                  cols="3"
                >
                <div class="pie" style="--p:100;--b:10px;--c:green;">100</div>
    
                </v-col>
                <v-col
                  cols="3"
                >
    
                <div class="pie" style="--p:100;--b:10px;--c:blue;">100</div>
                </v-col>
                <v-col
                  cols="3"
                >
                <div class="pie" style="--p:100;--b:10px;--c:yellow;">100</div>
    
                </v-col>
                <v-col
                  cols="3"
                >
                <div class="pie" style="--p:100;--b:10px;--c:black;">100</div>
    
                </v-col>
              </v-row>
            </v-container>
                
        </v-col>
       </v-card-text>
       </v-card>
       <v-card>
        TOTALES POR MES DEL AÑO CORRIENTE
    </v-card>
    </v-card>
    
    </template>
    <script>
    
    </script>
    
    <style>
    .pie {
      --w:150px;
      
      width: var(--w);
      aspect-ratio: 1;
      position: relative;
      display: inline-grid;
      place-content: center;
      margin: 5px;
      font-size: 25px;
      font-weight: bold;
      font-family: sans-serif;
    }
    .pie:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 0;
      background: conic-gradient(var(--c) calc(var(--p)*1%),#0000 0);
      -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
              mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
    }
    </style>