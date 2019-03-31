<template>
    <v-app>
        <v-layout>
            <v-container
      id="scroll-target"
      style="max-height: 562.5px"
      class="scroll-y"
    >
            <v-card-text class="py-0">  
      <v-timeline
        align-top
      >
    <v-timeline-item
      v-for="n in 2"
      :key="n"
      hide-dot
      color="red lighten-2" 
      right
    >
      <template v-slot:opposite>
        <span>Tus eu perfecto</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <div class="container">
          <img alt="" id="imagencita" width="40%" height="40%" @click.stop="dialog = true">
          <v-dialog 
          v-model="dialog"
          width="500">
          <v-card>
            <img id="imagencititita" width="100%" height="100%">
          </v-card>
            
          </v-dialog>
        </div>
        <div id="viewPdf">
          <object
            id="pdf"
            width="100%"
            height="100%">
          </object>
        </div>
      </v-card>
    </v-timeline-item>
      </v-timeline>
    </v-card-text>
    </v-container>
        </v-layout>
        <v-layout>
            <v-btn 
            outline
            fab dark color="primary"
            slot="activator"
            @click="pickFile"
            >
              <v-icon dark>add</v-icon>
              <input
              type="file"
              style="display: none"
              ref="image"
              @change="onFilePicked"
              >
            </v-btn>
            <v-textarea
              color="primary"
              v-model="message"
              height="75px"
              outline
              @keyup.enter="send"
            ></v-textarea>
            <v-btn fab dark color="primary">
            <v-icon dark @click="send">send</v-icon>
            </v-btn>
        </v-layout>
    </v-app>
</template>

<script>
import io from 'socket.io-client';
import path from 'path';
import $ from 'jquery';
import { constants } from 'fs';
import PDFObject from 'pdfobject';
const socket = io('157.230.169.186:3000');

export default {
  data: ()=> ({
    message: '',
    imageName: '',
		imageUrl: '',
    imageFile: '',
    img: '',
    dialog: false
  }),
  methods: {
    send(){
      socket.emit("chat", this.message);
      this.message = null;
      socket.on("chat", (mensaje)=>{
        console.log(mensaje);
      })
    },
    getFileExtension(filename){
      return filename.split('.').pop();
    },
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          socket.emit("sendpath", this.imageFile)
          socket.on("sendpath", function(info){
              var image = new Image();
              var pdf = info.buffer;
              PDFObject.embed(pdf, '#viewPdf')
              console.log(pdf)
              $('#pdf').attr('data', 'data:application/pdf;base64,'+pdf);
              $('#pdf').attr('src', pdf);
              image.src = 'data:*;base64,' + info.buffer;
              $('#imagencita').attr('src',image.src);
              $('#imagencititita').attr('src',image.src);
          })
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
    },
    
  }
}
</script>

<style >

</style>
