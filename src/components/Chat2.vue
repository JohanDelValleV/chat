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
            <v-btn 
            fab dark color="cyan"
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
           v-model="message"
            height="75px"
            outline
            success
            @keyup.enter="send"
            ></v-textarea>
            <v-btn fab dark color="primary">
            <v-icon dark @click="send">send</v-icon>
            </v-btn>
        </v-layout>
    </v-app>
</template>

<script>
export default {
  data: ()=> ({
    message: '',
    imageName: '',
		imageUrl: '',
		imageFile: ''
  }),
  methods: {
    send(){
      console.log(this.message)
      this.message = null
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
          //SOCKET HERE!! 
          console.log(this.imageFile)
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
  }
}
</script>

<style scoped>

</style>
