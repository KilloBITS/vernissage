'use strict';
var sex = 'boy';

if (!Detector.webgl) {
   Detector.addGetWebGLMessage();
}

var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;

function init() {
   container = document.createElement('div');
   container.id = 'dMOdels';
   $('#avatar').append(container);
   /* Camera */
   // camera = new THREE.PerspectiveCamera(95, ($('#avatar').innerWidth() + 100) / ($('#avatar').innerHeight() + 100), 1, 10000);
   // camera.position.set( 1, 1, 1);
   camera = new THREE.PerspectiveCamera(45, ($('#avatar').innerWidth() + 50) / ($('#avatar').innerHeight() + 50), 1, 1000);
   camera.position.z = 3;
   camera.setViewOffset(100, 50, 35, -15, 30, 48)
   /* Scene */
   scene = new THREE.Scene();
   // scene.add( new THREE.AxisHelper( 1000 ) );
   lighting = true;

   ambient = new THREE.AmbientLight(0xffffff, 1.0);
   scene.add(ambient);

   keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
   keyLight.position.set(50, 0, 50);

   fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
   fillLight.position.set(30, 0, 50);

   backLight = new THREE.DirectionalLight(0xffffff, 1.0);
   backLight.position.set(50, 0, -100).normalize();


   /* Model */
   var mtlLoader = new THREE.MTLLoader();
   mtlLoader.setBaseUrl('3D/'+sex+'/');
   mtlLoader.setPath('3D/'+sex+'/');
   mtlLoader.load(sex+'.mtl', function (materials) {
       materials.preload();
       var objLoader = new THREE.OBJLoader();
       objLoader.setMaterials(materials);
       objLoader.setPath('3D/'+sex+'/');
       objLoader.load(sex+'.obj', function (object) {
           scene.add(object);
       });
   });

   /* Renderer */
   renderer = new THREE.WebGLRenderer({ alpha: true });
   renderer.setPixelRatio(window.devicePixelRatio);
   // renderer.setSize(window.innerWidth, window.innerHeight);
   // renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
   renderer.setClearColor( 0xffffff, 0);
   renderer.setSize($('#avatar').width(), $('#avatar').height());
   container.appendChild(renderer.domElement);
   /* Controls */
   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.enableDamping = true;
   controls.dampingFactor = 0.25;

   // controls.enabled = false;
   controls.enableZoom = true;
   /* Events */
   window.addEventListener('resize', onWindowResize, false);
   window.addEventListener('keydown', onKeyboardEvent, false);
}

function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyboardEvent(e) {
   if (e.code === 'KeyL') {
       lighting = !lighting;
       if (lighting) {
           ambient.intensity = 0.25;
           scene.add(keyLight);
           scene.add(fillLight);
           scene.add(backLight);
       } else {
           ambient.intensity = 1.0;
           scene.remove(keyLight);
           scene.remove(fillLight);
           scene.remove(backLight);
       }
   }
}

function animate() {
   requestAnimationFrame(animate);
   controls.update();
   render();
}

function render() {
   renderer.render(scene, camera);
}

$(document).ready(function(){
 // init();
 // animate();
 $('.button-section').click(function(){
   $(".option-section").removeClass('selected');
   if(sex ===  'boy'){
     sex = 'girl';
     $(".option-section:eq(0)").addClass('selected');
   }else{
     sex = 'boy';
     $(".option-section:eq(1)").addClass('selected');
   }
   while(scene.children.length > 0){
      scene.remove(scene.children[0]);
  }
  $("#dMOdels").remove();
  init();
  animate();
 });


 $(".setFraction").click(function(){
   let index = $(".setFraction").index(this);
   $(".setFraction div").removeClass('selectFraction').css({"filter":"blur(2px)"});
   $(".setFraction:eq("+index+") div").addClass('selectFraction').css({"filter":"blur(0)"});
 });
})
