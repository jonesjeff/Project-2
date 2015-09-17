
		var renderer, scene, camera, controls, effect, reticle, manager; 
		var planeClouds, planeBirds, planeShield;
		var symbolControl = new THREE.Object3D();
		var titleControl = new THREE.Object3D();
		var symbols = [];
		var cloudChildren = [];
		var cube;
		var dae;
		var video, videoImage, videoImageContext, videoTexture;
		var count = 0;

		var circumference = 3.6;
		var radius = circumference / 3.14 / 2;
		var height = 0.9;

		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		renderer.setClearColor( 0xffffff, 1);
		renderer.sortObjects = false;
		renderer.shadowMap.enabled = true;
		document.body.appendChild( renderer.domElement );


		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
		controls = new THREE.VRControls( camera );

		effect = new THREE.VREffect( renderer );
		effect.setSize( window.innerWidth, window.innerHeight );

		manager = new WebVRManager(renderer, effect);

		//create gaze interaction manager
		reticle = vreticle.Reticle(camera);
		scene.add(camera);

							var enviroment = new THREE.ColladaLoader();
							enviroment.options.convertUpAxis = true;
							enviroment.load( 'models/testFlat.dae', function ( collada ) {

								enviroment = collada.scene;
								enviroment.traverse( function ( child ) {

									if ( child instanceof THREE.Mesh ) {

										child.geometry.computeFaceNormals();
										child.material.shading = THREE.FlatShading;
										// child.material.shininess = 0x3D3d3D;
										// child.material.specular = 1;
										// child.material.metal = false;			
									}
									child.traverse( function(e) {
										e.recieveShadow = true;				
									})
								} );

								enviroment.scale.x = enviroment.scale.y = enviroment.scale.z = 3;
								enviroment.position.y = -2;	
								enviroment.rotation.y = 2* Math.PI/2;
								enviroment.updateMatrix();
							} );


							var birdSymbol = new THREE.ColladaLoader();
							birdSymbol.options.convertUpAxis = true;
							birdSymbol.load( 'models/RotateSymbols/bird.dae', function ( collada ) {
								count = 0;
								birdSymbol = collada.scene;
								console.log(birdSymbol.children[0]);
								birdSymbol.traverse( function ( child ) {

									if ( child instanceof THREE.Mesh ) {
										if(count == 1){
											reticle.add_collider(child);
											child.ongazelong = function(){

											}

											child.ongazeover = function(){
												this.material = new THREE.MeshBasicMaterial({
													color: 0xf0d97a
												});								
												planeBirds.material.visible = true;
											}

											child.ongazeout = function(){
												this.material = new THREE.MeshLambertMaterial({
													color: 0xf1c40f
												});			
												planeBirds.material.visible = false;
											}
										}
										count ++;
									} 
									child.traverse( function(e) {
										e.recieveShadow = true;
										e.recieveLights = true;
										e.castShadow = true;
									})
								} );

								birdSymbol.scale.x = birdSymbol.scale.y = birdSymbol.scale.z = 0.03;
								//birdSymbol.rotation.x = Math.PI / 2;
								birdSymbol.updateMatrix();
							} );

							var shieldSymbol = new THREE.ColladaLoader();
							shieldSymbol.options.convertUpAxis = true;
							shieldSymbol.load( 'models/RotateSymbols/shield.dae', function ( collada ) {
								count = 0;
								shieldSymbol = collada.scene;


								shieldSymbol.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { 
									if(count == 1){
										reticle.add_collider(node);
										node.ongazelong = function(){

										}

										node.ongazeover = function(){
											this.material = new THREE.MeshBasicMaterial({
												color: 0xE84C3D
											});
											planeShield.material.visible = true;


										}

										node.ongazeout = function(){
											this.material = new THREE.MeshLambertMaterial({
												color: 0x7F2A26
											});
											planeShield.material.visible = false;
										}
									}
									count ++;

								} 
							} );

								shieldSymbol.scale.x = shieldSymbol.scale.y = shieldSymbol.scale.z = 0.03;
								//shieldSymbol.rotation.x = Math.PI / 2;
								shieldSymbol.updateMatrix();	
							} );

							var cloudSymbol = new THREE.ColladaLoader();
							cloudSymbol.options.convertUpAxis = true;
							cloudSymbol.load( 'models/RotateSymbols/clouds.dae', function ( collada ) {
								count = 0;
								cloudSymbol = collada.scene;


								cloudSymbol.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { 
									if(count == 1){

										reticle.add_collider(node);
										node.ongazelong = function(){

										}

										node.ongazeover = function(){
											this.material = new THREE.MeshBasicMaterial({
												color: 0xff983e
											});
											planeClouds.material.visible = true;
										}

										node.ongazeout = function(){
											this.material = new THREE.MeshLambertMaterial({
												color: 0xe77e23
											});
											planeClouds.material.visible = false;
										}
									}
									count ++ 

								} 
							} );


							cloudSymbol.scale.x = cloudSymbol.scale.y = cloudSymbol.scale.z = 0.03;
							//cloudSymbol.rotation.x = Math.PI / 2;
							cloudSymbol.updateMatrix();
						} );

						var title = new THREE.ColladaLoader();
						title.options.convertUpAxis = true;
						title.load( 'models/Text_ColorFix2.dae', function ( collada ) {

							title = collada.scene;


							title.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );

							title.scale.x = title.scale.y = title.scale.z = 0.03;
							title.rotation.x = Math.PI / 2;
							//title.position.y = -0.05;
							title.position.z = -.5;
							title.updateMatrix();

							init();
												
						} );



		function init() { 		

						// var light = new THREE.DirectionalLight( 0xffffff, 1 );
						// light.position.set( 0, -10, -10 );
						// light.castShadow = true;
						// light.shadowDarkness = 0.5;
						// light.shadowCameraVisible = true;
						// light.target.position.set( -1, 1, 0);

						// var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
						// 	directionalLight.position.x = Math.random() - 0.5;
						// 	directionalLight.position.y = Math.random() - 0.5;
						// 	directionalLight.position.z = Math.random() - 0.5;
						// 	directionalLight.position.normalize();
						// 	directionalLight.shadowCameraVisible = true;

						// 	directionalLight.castShadow = true;
						// 	directionalLight.shadowDarkness = 0.5;
						// 	scene.add( directionalLight );

						// Lights

							// var directionalLight = new THREE.HemisphereLight( 0xffeeee, 0x111122, 0.7 );
							// directionalLight.position.x = -0.5;
							// directionalLight.position.y = 0.5;
							// directionalLight.position.z = -0.5;
							// directionalLight.position.normalize();
							// //directionalLight.castShadow = true;
							// //directionalLight.shadowDarkness = 0.5;
							// scene.add( directionalLight );


						var light = new THREE.AmbientLight(0x404040);
							scene.add(light);

							var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
							directionalLight.position.set(-1, 1, 1);
							directionalLight.position.normalize();

							scene.add(directionalLight);

							var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
							hemisphereLight.position.set(-1, 5, 5.5);
							scene.add(hemisphereLight);

							

						var info_G = new THREE.CylinderGeometry( radius, radius, height, 60, 1, true );
							info_G.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

							var info_M = new THREE.MeshBasicMaterial( { 
								transparent: true, 
								side: THREE.DoubleSide,
								map: THREE.ImageUtils.loadTexture( 'images/slimWhiteBackground.png' )
							});
							var info = new THREE.Mesh( info_G, info_M );
							scene.add( info );	


						initSymbols();
						initTitle();
						initWorld();

							scene.add(titleControl);
							scene.add(symbolControl);
							scene.add(enviroment);
							scene.add(title);
							animate();
							

						}

						function initSymbols() {

							

							symbols.push(cloudSymbol);
							symbols.push(birdSymbol);
							symbols.push(shieldSymbol);
							
							var x = 0;
							var increment = .5;

							var arrayLength = symbols.length;
							for (var i = 0; i < arrayLength; i++) {
								var xPos = Math.sin(x) * 0.5;
								var zPos = Math.cos(x) * 0.5;
								x += increment;

								symbols[i].position.set(xPos,0,-(zPos));
								symbols[i].updateMatrix();
								symbolControl.add(symbols[i]);

								if(i == 0){
									var planeClouds_G = new THREE.PlaneGeometry(0.8, 0.2, 1);
									var planeClouds_M = new THREE.MeshLambertMaterial( {color: 0xff983e, side: THREE.DoubleSide, transparent: true, opacity: 0.8, visible: false } );
									planeClouds = new THREE.Mesh(planeClouds_G, planeClouds_M);
									planeClouds.position.set(xPos, .3, -(zPos));
									planeClouds.recieveShadow = true;
									planeClouds.recieveLights = true;

									planeClouds.material.visible = false;

									symbolControl.add(planeClouds);	
								}
								if(i == 1){
									var planeBirds_G = new THREE.PlaneGeometry(0.8, 0.2, 1);
									var planeBirds_M = new THREE.MeshLambertMaterial( {color: 0xf0d97a, side: THREE.DoubleSide, transparent: true, opacity: 0.8, visible: false } );
									planeBirds = new THREE.Mesh(planeBirds_G, planeBirds_M);
									planeBirds.position.set(xPos, .3, -(zPos));
									planeBirds.recieveShadow = true;
									planeBirds.recieveLights = true;
									planeBirds.material.visible = false;
									symbolControl.add(planeBirds);			
								}
								if(i == 2){
									var planeShield_G = new THREE.PlaneGeometry(0.8, 0.2, 1);
									var planeShield_M = new THREE.MeshLambertMaterial( {color: 0xE84C3D, side: THREE.DoubleSide, transparent: true, opacity: 0.8, visible: false } );
									this.planeShield = new THREE.Mesh(planeShield_G, planeShield_M);
									planeShield.position.set(xPos, .3, -(zPos));
									planeShield.recieveShadow = true;
									planeShield.recieveLights = true;
									
									symbolControl.add(planeShield);		
								}
							}
							symbolControl.rotation.y = -Math.PI /3;

						}

						function Plane(){
							var plane_M = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, opacity: 0.6} );
							var plane_G = new THREE.PlaneGeometry(Math.PI / 16, 0.1, 1);
							plane_BG = new THREE.Mesh(plane_G, plane_M);
							plane_BG.scale.set(1.2, 1.2, 1.2);
							plane_BG.position.set(0,0,-0.51);
						}

						function initTitle(){

							video = document.createElement( 'video' );
							// video.id = 'video';
							// video.type = ' video/ogg; codecs="theora, vorbis" ';
							video.src = "videos/test.mp4";
							video.loop = "true";
							video.load(); // must call after setting/changing source
							video.play();

							videoImage = document.createElement( 'canvas' );
							videoImage.width = 500;
							videoImage.height = 700;

							videoImageContext = videoImage.getContext( '2d' );
							// background color if no video present
							videoImageContext.fillStyle = '#000000';
							videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

							videoTexture = new THREE.Texture( videoImage );
							videoTexture.minFilter = THREE.LinearFilter;
							videoTexture.magFilter = THREE.LinearFilter;

							var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
							// the geometry on which the movie will be displayed;
							// 		movie image will be scaled to fit these dimensions.

							var planePhone_G = new THREE.PlaneGeometry(0.05, 0.07, 1);
							
							planePhone = new THREE.Mesh(planePhone_G, movieMaterial);
							planePhone.position.z = -0.694;
							planePhone.position.x = -.3085;
							planePhone.position.y = -.035;

							titleControl.add(planePhone);

						}

						function initWorld(){
							var worldImg_G = new THREE.SphereGeometry( 1000, 64, 32 );
							worldImg_G.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

							var worldImg_M = new THREE.MeshBasicMaterial( {
								color: 0x3598db
							} );

							var worldImg = new THREE.Mesh( worldImg_G, worldImg_M );
							scene.add( worldImg );
						}

						function animate() {
							update();
							render();
						}

						function update(){

							controls.update();
							//console.log(camera.rotation.y);
							var arrayLength = symbols.length;
							for (var i = 0; i < arrayLength; i++) {
								symbols[i].lookAt(camera.position);		
							}
							planeClouds.lookAt(camera.position);
							planeBirds.lookAt(camera.position);
							planeShield.lookAt(camera.position);						
							manager.render(scene, camera);
						//reticle_loop
						reticle.reticle_loop();

					}

					function render() {

						if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
						{
							videoImageContext.drawImage( video, 0, 0 );
							if ( videoTexture ) 
								videoTexture.needsUpdate = true;
						}
						effect.render( scene, camera );
						requestAnimationFrame( animate );
					}
					

					/*
					Listen for double click event to enter full-screen VR mode
					*/
					document.body.addEventListener( 'dblclick', function() {
						effect.setFullScreen( true );
					});

					/*
					Listen for keyboard events to zero positional sensor or enter full-screen VR mode.
					*/
					function onkey(event) {

						if (!(event.metaKey || event.altKey || event.ctrlKey)) {
							event.preventDefault();
						}

				    if (event.charCode == 'z'.charCodeAt(0)) { // z
				    	controls.zeroSensor();
				    } else if (event.charCode == 'f'.charCodeAt(0)) { // f
				    	effect.setFullScreen( true );
				    }
				};

				window.addEventListener("keypress", onkey, true);

					/*
					Handle window resizes
					*/
					function onWindowResize() {
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();

						effect.setSize( window.innerWidth, window.innerHeight );
					}

					window.addEventListener( 'resize', onWindowResize, false );