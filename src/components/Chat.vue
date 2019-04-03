<template>
    <v-app>
      <v-toolbar dark color="primary">
          <img width="45px" :src="avatarRemitente">
         <v-toolbar-title class="white--text">{{remitente}}</v-toolbar-title>
         <div id="typing"></div>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-snackbar
      v-model="snackbar"
        top
      :timeout="timeout"
        right
      >
        {{ text }}
        <v-btn
          color="accent"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
        <v-layout>
          <v-container
          id="scroll-target"
          class="scroll-y"
          >
          <v-card-text class="py-0" id="timeline">  
          <v-timeline
          align-top
          >
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
              <v-card class="elevation-2" min-width="300px">
                <div v-if="msg.href!=null">
                    <v-card-text><a target="_blank" v-bind:href="msg.href" download>{{msg.mensaje}}</a>
                      <v-spacer></v-spacer>
                      <a v-bind:href="msg.href" target="_blank" download><v-icon color="secondary">get_app</v-icon></a>
                    </v-card-text>
                  </div>
                  <div v-else>
                       <v-card-text>{{msg.mensaje}}</v-card-text>
                  </div>
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
                <v-card class="elevation-2" min-width="300px" dark  color="secondary">
                  <div v-if="msg.href!=null">
                      <v-card-text><a class="link-recibido" target="_blank" v-bind:href="msg.href" download>{{msg.mensaje}}</a>
                        <v-spacer></v-spacer>
                        <a class="link-recibido" v-bind:href="msg.href" target="_blank" download><v-icon color="white">get_app</v-icon></a>
                      </v-card-text>
                  </div>
                  <div v-else>
                       <v-card-text>{{msg.mensaje}}</v-card-text>
                  </div>
                </v-card>
              </v-timeline-item> 
            </div>
          </div>
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
                id="file"
                >
            </v-btn>
            <v-textarea
              color="primary"
              v-model="message"
              height="75px"
              outline
              id="input"
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
import SocketIOFileClient from 'socket.io-file-client';
const socket = io('redespolitecnica5.ddns.net:3030');
var uploader = new SocketIOFileClient(socket);
var auxMessage = '';
export default {
  data: ()=> ({
    snackbar: false,
    timeout: 1000,
    text: 'Entregado.',
    message: '',
    ruta: null,
    img: '',
    usuario: 'Juan',
    remitente: 'Maria',
    dialog: false,
    messages:new Array(),
    avatarRemitente:'',
    avatar:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned',
  }),
  mounted() {
    socket.on('connect', function () {
      console.log(':)')
      
    });
    socket.emit('callbackjuan',true)
    socket.on('juan',(mensaje)=>{
      this.avatarRemitente=mensaje["avatar"]
      this.messages.unshift(mensaje)
      socket.emit('callbackjuan',true)
      document.getElementById('typing').innerHTML = '';
    })
    uploader.on('ready', function() {
      console.log('SocketIOFile ready to go!');
    });

    document.getElementById('input').addEventListener('keypress', function(){
      socket.emit('typing:juan')
    });

    socket.on('typing:maria', function(){
      document.getElementById('typing').innerHTML=`<em>  está escribiendo</em>`
    });

  },
  methods: {
    send(){
      if(this.message.trim()!=""){
        var time = (new Date()).toTimeString().replace(' GMT-0600 (Central Standard Time)','');
        var mensaje={"usuario":this.usuario,"mensaje":this.message,"hora":time,"posicion":"right","avatar":this.avatar,"href":null};
        this.messages.unshift(mensaje)
        this.messages=this.messages;
        this.message = null;
        socket.emit('maria', mensaje);
        socket.on('callbackmaria',(callback)=>{
          if(callback){
            this.text=time+' entregado.';
            this.snackbar=true;
          }
        }) 
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
    onFilePicked () {
          uploader.on('loadstart', function() {
            console.log('Loading file to browser before sending...');
          });
          uploader.on('progress', function(progress) {
            console.log('Loaded ' + progress.loaded + ' / ' + progress.total);
          });
          uploader.on('start', function(fileInfo) {
            console.log('Start uploading', fileInfo);
          });
          uploader.on('stream', function(fileInfo) {
            console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
          });
          uploader.on('complete', function(fileInfo) {
            console.log('Upload Complete', fileInfo);
          });
          uploader.on('error', function(err) {
            console.log('Error!', err);
          });
          uploader.on('abort', function(fileInfo) {
            console.log('Aborted: ', fileInfo);
          });
          var fileEl = document.getElementById('file');
          var liga = "http://redespolitecnica5.ddns.net:3030/data/"+fileEl.value.replace('C:\\fakepath\\','');
          uploader.upload(fileEl);
          auxMessage = liga.replace('http://redespolitecnica5.ddns.net:3030/data/','')
          let time = (new Date()).toTimeString().replace(' GMT-0600 (Central Standard Time)','');
          let mensaje ={"usuario":this.usuario,"mensaje":auxMessage,"hora":time,"posicion":"right","avatar":this.avatar, "href":liga};
          socket.emit('maria', mensaje);
          socket.on('callbackmaria',(callback)=>{
            if(callback){
              this.text=time+' entregado.';
              this.snackbar=true;
            }
          }) 
          this.messages.unshift(mensaje)
          this.messages=this.messages
    },

  },
  watch: {

  },
  computed: {
    
  }

}
</script>

<style>
#scroll-target{
  height: 500px;
  width: 100%;
}
.link-recibido{
  color: white;
  text-decoration: none;
}
</style>
