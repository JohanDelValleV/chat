<template>
    <v-app>
      <v-toolbar dark color="primary">
          <img width="45px" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale">
         <v-toolbar-title class="white--text">{{remitente}}</v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
        <v-layout>
          <v-container
          id="scroll-target"
          class="scroll-y"
          >
          <v-card-text class="py-0" id="timeline">  
          <v-timeline
          align-top
          >
          <!-- <v-slide-x-transition
            group
          > -->
          <div v-for="msg in messages" :key="msg.time">
              <div v-if="msg.usuario==usuario">
              <v-timeline-item
                right
              >
              <template v-slot:icon>
                <v-avatar>
                  <img :src="msg.avatar">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <span>{{msg.hora}}</span>
              </template>
              <v-card class="elevation-2" width="500px">
                <v-card-text>{{msg.mensaje}}</v-card-text>
              </v-card>
              </v-timeline-item> 
            </div>
            <div v-else>
              <v-timeline-item
                left
              >
                <template v-slot:icon>
                  <v-avatar>
                    <img :src="msg.avatar">
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <span>{{msg.hora}}</span>
                </template>
                <v-card class="elevation-2" width="500px" dark  color="secondary">
                  <v-card-text>{{msg.mensaje}}</v-card-text>
                </v-card>
              </v-timeline-item> 
            </div>
          </div>
              <!-- </v-slide-x-transition>    -->
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
const socket = io('127.0.0.1:3030');

export default {
  data: ()=> ({
    message: '',
    imageName: '',
		imageUrl: '',
    imageFile: '',
    img: '',
    usuario: 'Juan',
    remitente: 'Maria',
    dialog: false,
    avatar:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned',
    messages:new Array(),
  }),
  mounted() {
    socket.on('connect', function () {
      console.log(':)')
      
    });
    socket.on('juan',(mensaje)=>{
        this.messages.unshift(mensaje)
      })
  },
  methods: {
    send(){
      if(this.message.trim()!=""){
        var time = (new Date()).toTimeString().replace(' GMT-0600 (Central Standard Time)','');
        var mensaje={"usuario":this.usuario,"mensaje":this.message,"hora":time,"posicion":"right","avatar":"https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"};
        this.messages.unshift(mensaje)
        this.messages=this.messages;
        socket.emit('maria', mensaje, (callback) => {
            console.log(callback);
        });
        this.message = null;
      }
      else{
        this.message = null;
      }
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

<style>
#scroll-target{
  height: 500px;
  width: 100%;
}
</style>
