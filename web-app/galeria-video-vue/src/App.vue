<template>
  <div>
    <header></header>
    <div class="row router">
      <div class="container">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ManterGaleria from "./components/galeria/MasterGaleria.vue";

export default {
  name: "app",
  components: {
    ManterGaleria
  }
};
</script>

<style>
.galeria h1{font-size:1.8em;font-weight:400;color:#666;margin-top:2px;}
a{
	text-decoration: none;
	-webkit-transition: 0.5s;
	-moz-transition: 0.5s;
	-o-transition: 0.5s;
	-ms-transition: 0.5s;
	transition: 0.5s;
}
a:hover{
	-webkit-transition: 0.5s;
	-moz-transition: 0.5s;
	-o-transition: 0.5s;
	-ms-transition: 0.5s;
	transition: 0.5s;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header{
  width: 100%;
  float: left;
  position: relative;
}
.router{
  width: 100%;
  float: left;
  position: relative;
  margin-top: 80px; 
}
.alert{width:100%;}
.video-thumb{
  margin-bottom:30px;
}
.video-thumb .card{
  border:none;
  margin-bottom:30px;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  -webkit-transition: 0.5s;
	-moz-transition: 0.5s;
	-o-transition: 0.5s;
	-ms-transition: 0.5s;
	transition: 0.5s;
}
.video-thumb .card:hover{
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.30);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.30);
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.30);
  -webkit-transition: 0.5s;
	-moz-transition: 0.5s;
	-o-transition: 0.5s;
	-ms-transition: 0.5s;
	transition: 0.5s;
}
.video-thumb h2{font-size:1.2em;font-weight:600;color:#666;}
.video-thumb a{font-size:1em; color:#666;}
.video-thumb a:hover{font-size:1em; color:#28a745;}
.card-body{padding: 28px 1.25rem 23px 1.25rem !important;}

</style>
