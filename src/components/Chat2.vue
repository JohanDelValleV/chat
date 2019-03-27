<template>
    <v-app>
        <v-layout>
            <v-container
      id="scroll-target"
      style="max-height: 500px"
      class="scroll-y"
    >
            <v-card-text class="py-0">
                
      <v-timeline
        align-top
      >
    <v-timeline-item
      v-for="n in 4"
      :key="n"
      color="red lighten-2" 
      right
    >
      <template v-slot:opposite>
        <span>Tus eu perfecto</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </v-card-text>
      </v-card>
    </v-timeline-item>
      </v-timeline>
    </v-card-text>
    </v-container>
        </v-layout>
        <v-layout>
            <v-btn fab dark color="cyan">
            <v-icon dark>add</v-icon>
            </v-btn>
           <v-textarea
            height="75px"
            outline
            ></v-textarea>
            <v-btn fab dark color="primary">
            <v-icon dark>send</v-icon>
            </v-btn>
        </v-layout>
    </v-app>
</template>
